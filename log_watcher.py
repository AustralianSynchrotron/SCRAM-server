#!/usr/bin/env python

import pyinotify
# import subprocess
import requests

#http://www.saltycrane.com/blog/2010/04/monitoring-filesystem-python-and-pyinotify/

class AlhEventHandler(pyinotify.ProcessEvent):
    def process_IN_MODIFY(self,event):
        print('File Modified (IN_MODIFY)')
        print(event.pathname)

        # Get the number of lines to only grab the new data
        #lines = wccount(event.pathname)
        #print(lines)

        if 'Alarm' in event.pathname:
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
        # url = 'http://10.17.100.199:9119/sendmail/'
        # data = {
        #         'subject': 'A Quick word from the ALH Log',
        #         'body': line,
        #         'recipients': 'debooyj,trewhej' }
        print(requests.post(url, data).text)

    def process_IN_ACCESS(self,event):
        print('File Accessed (IN_ACCESS)')
        #print(event.pathname)

        #with open(event.pathname) as f:
        #    for line in f:
        #        pass
        #    last = line
        #print(line)

#
# def wccount(filename):
#     out = subprocess.Popen(['wc', '-l', filename],
#                          stdout=subprocess.PIPE,
#                          stderr=subprocess.STDOUT
#                          ).communicate()[0]
#     return int(out.partition(b' ')[0])


def main():
    wm = pyinotify.WatchManager()
    wm.add_watch('/asp/logs/alh/',pyinotify.ALL_EVENTS)
    #wm.add_watch('/asp/logs/alh/CR01OPI01-opi-SYS.Alarm.2017-02-16',pyinotify.ALL_EVENTS)

    eh = AlhEventHandler()

    notifier = pyinotify.Notifier(wm,eh)
    notifier.loop()

if __name__ == '__main__':
    main()
