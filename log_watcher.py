#!/usr/bin/env python

import pyinotify
# import subprocess
import requests

#http://www.saltycrane.com/blog/2010/04/monitoring-filesystem-python-and-pyinotify/

class AlhEventHandler(pyinotify.ProcessEvent):
    def process_IN_MODIFY(self,event):
        print('File Modified (IN_MODIFY)')
        print(event.pathname)

        if 'Alarm' in event.pathname:
            last = '?NaN?'
            with open(event.pathname) as f:
                for line in f:
                    pass
                # we just want the last line added to file
                last = line
            print(line)

            # export string to handler
            url = 'http://10.17.100.199:9668/relay/ALH/'
            data = {
                'alh_string': last
            }
            print(requests.post(url, data).text)

    def process_IN_ACCESS(self,event):
        print('File Accessed (IN_ACCESS)')

def main():
    wm = pyinotify.WatchManager()
    wm.add_watch('/asp/logs/alh/',pyinotify.ALL_EVENTS)

    eh = AlhEventHandler()

    notifier = pyinotify.Notifier(wm,eh)
    notifier.loop()

if __name__ == '__main__':
    main()
