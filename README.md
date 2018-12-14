# hain-plugin-ansible-server-site

Open ansible-server sites in putty.

[Russian readme](README_RU.md)

## Requirements
- it highly depends of usage [ansible-server](https://github.com/viasite-ansible/ansible-server)
- putty.exe should be placed in %PATH% directory
- putty will use Default settings, you should configure it
- install font [DejaVu Sans Mono for Powerline](https://github.com/powerline/fonts/blob/master/DejaVuSansMono/DejaVu%20Sans%20Mono%20for%20Powerline.ttf?raw=true)

### Recommended Default session settings:

```
Window
    Columns: 120
    Rows: 40
    Lines of scrollback: 10000
    Reset scrollbar on keypress: yes
    Reset scrollbar on display activity: no

    Appearance
        Font: DejaVu Sans Mono for Powerline, 10pt

    Connection
        SSH
            Auth
                Allow agent forwarding: yes
```

## Install

### hpm:
```
/hpm install hain-plugin-ansible-server-site
```

### From Git:
Copy source to `%LOCALAPPDATA%\hain-user\devplugins\hain-plugin-ansible-server-site`:

```
git clone https://github.com/viasite-ansible/hain-plugin-ansible-server-site "%LOCALAPPDATA%\hain-user\devplugins\hain-plugin-ansible-server-site"
```

Restart Hain.
Command `/site` should appear.
