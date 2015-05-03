#!/usr/bin/osascript

set macbook_monitor_dimensions to {width: 1440, height: 900}
set macbook_monitor_bounds to {-1440, 1000, 0, 1900}

set thunderbolt_monitor_dimensions to {width: 2560, height: 1440}
set thunderbolt_monitor_bounds to {0, 44, 2560, 1440}

tell application "uTorrent" to activate

tell application "Firefox" to activate
tell application "System Events" to keystroke "n" using command down
delay 1
tell application "Firefox"
  repeat with i from 1 to 20
    open location "http://www.rlslog.net/category/movies/page/" & i & "/"
  end repeat
  set properties of front window to {bounds: {0, 0, 1480, 1440}}
end tell
delay 2

tell application "System Events" to keystroke "n" using command down
delay 4
tell application "Firefox"
  open location "https://torrentz.eu/"
  set properties of front window to {bounds: {1480, 0, 2560, 1280}}
end tell
