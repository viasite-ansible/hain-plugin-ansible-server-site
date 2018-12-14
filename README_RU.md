# hain-plugin-ansible-server-site

Открывает сайты ansible-server в putty.

## Требования
- вы должны работать в @viasite
- putty.exe должен быть доступен глобально (должен лежать в папке, которая есть в %PATH%)
- putty будет запускать сессию Default settings, ее надо настроить вручную:
- установить шрифт [DejaVu Sans Mono for Powerline](https://github.com/powerline/fonts/blob/master/DejaVuSansMono/DejaVu%20Sans%20Mono%20for%20Powerline.ttf?raw=true), чтобы нормально отображались все символы в ansible-role-zsh строке

### Рекомендуемые настройки Default session:

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

## Установка

### Через hpm:
```
/hpm install hain-plugin-ansible-server-site
```

### Для разработчиков:
Скопировать в `%LOCALAPPDATA%\hain-user\devplugins\hain-plugin-ansible-server-site`:

```
git clone https://github.com/viasite-ansible/hain-plugin-ansible-server-site "%LOCALAPPDATA%\hain-user\devplugins\hain-plugin-ansible-server-site"
```

Перезапустить Hain.
Должна заработать команда `/site`.
