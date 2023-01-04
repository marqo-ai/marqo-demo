from typing import Any
# multithreading
from threading import Thread, local
from requests.sessions import Session
from queue import Queue


class CPUTaskSupports:
    # multithreading
    queue = Queue()
    thread_local = local()
    thread_num = 10

    def multithread_process(self, items, target_function) -> None:
        for item in items:
            print(item)
            self.queue.put(item)

        for _ in range(self.thread_num):
            t_worker = Thread(target=target_function)
            t_worker.daemon = True
            t_worker.start()

        self.queue.join()
