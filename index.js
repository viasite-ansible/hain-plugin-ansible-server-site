'use strict';
const got = require('got');
const JSON_URL = 'https://dev.viasite.ru/sites.json';

function loadJson(url){
  return got(url, { json: true }).then((res) => res.body);
}

module.exports = (pluginContext) => {
  const logger = pluginContext.logger;
  const exec = require('child_process').exec;
  const localStorage = pluginContext.localStorage;

  let lastSelectedLimit = 5;
  let lastSelected = localStorage.getItem('lastSelected') || [];

  var stored_sites = [];

  function loadSites() {
    logger.log('loading sites...')

    // logger.log(XMLHttpRequest);
    // logger.log(axios);
    loadJson(JSON_URL)
      .then(json => {
        stored_sites = json.sites;
        logger.log('after open: ' + json.sites.length);
      })
  }


  function startup() {
    loadSites()
  }

  function search(query, res) {
    let found_matches = 0;
    let has_query = false;

    let filter_call = (item) => { return true; };

    // search query
    if (!(!query || query.trim().length === 0)) {
      query = query.trim().toLowerCase();
      has_query = true;

      filter_call = (item) => {
        let found = item.domain.toLowerCase().startsWith(query.toLowerCase()) ? true : false;
        if (found) found_matches++;
        return found;
      }
    }
    // MRU
    else if(lastSelected.length > 0){
      lastSelected = localStorage.getItem('lastSelected') || [];
      lastSelected.forEach(item => {
        res.add({
          id: 'session',
          title: item.domain, //punycode.toUnicode(item.domain),
          payload: item,
          desc: item.host + (item.group ? ' / ' + item.group : ''),
          icon: '#fa fa-chevron-right'
          });
      });

      // divider
      res.add({
        id: '',
        title: '-----------------------',
        payload: '',
        icon: '#fa '
      });
    }

    let filtered = stored_sites.filter(item => {
      return item.domain.toLowerCase().search(query) >= 0
    });

    filtered.sort((a, b) => {
      let aBegin = a.domain.toLowerCase().startsWith(query.toLowerCase()) ? true : false;
      let bBegin = b.domain.toLowerCase().startsWith(query.toLowerCase()) ? true : false;
      if(aBegin && !bBegin) return -1;
      if(!aBegin && bBegin) return 1;
      return 0;
    });

    filtered.forEach(item => {
      res.add({
        id: 'session',
        title: item.domain, //punycode.toUnicode(item.domain),
        payload: item,
        desc: item.host + (item.group ? ' / ' + item.group : ''),
        icon: '#fa fa-chevron-right'
      });
    });

    // add "putty call"
    res.add({
      id: 'q',
      title: has_query ? 'putty.exe ' + query  : query,
      payload: query,
      desc: 'Run PuTTY command',
      icon: '#fa fa-search'
    });

    // other commands
    res.add({
      id: 'reload',
      title: 'reload',
      desc: 'reload sites.json',
      icon: '#fa fa-refresh'
    });

  }

  function updateLastSelected(payload) {
    const limit = parseInt(lastSelectedLimit);

    if (!payload) {
      return;
    }

    logger.log('lastSelected:', lastSelected);

    lastSelected = lastSelected
      .filter(session => session.domain != payload.domain) // remove duplicate
      // .filter(session => stored_sites.indexOf(session) != -1); // remove old values

    lastSelected.unshift(payload); // add new session
    lastSelected = lastSelected.slice(0, limit); // limit
    localStorage.setItem('lastSelected', lastSelected);
    logger.log('lastSelected:', lastSelected);
  }

  function execute(id, payload) {
    
    logger.log("id: " + id, "payload: " + payload);

    switch (id) {
      case 'q':
        if (payload.trim().length > 0) {
          exec('START putty ' + payload);
        }
      break;

      case 'session':
        updateLastSelected(payload);
        exec('START putty ' + payload.user + '@' + payload.host);
      break;

      case 'reload':
        loadSites();
      break;
    }
  }

  return { startup, search, execute };
};