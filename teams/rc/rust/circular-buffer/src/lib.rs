use std::collections::VecDeque;

pub struct CircularBuffer<T> {
    buffer: VecDeque<T>,
    cap: usize, // keep track of the capacity because VecDeque::capacity() might report larger value
}

#[derive(Debug, PartialEq)]
pub enum Error {
    EmptyBuffer,
    FullBuffer,
}

impl<T> CircularBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        CircularBuffer {
            buffer: VecDeque::with_capacity(capacity),
            cap: capacity,
        }
    }

    pub fn write(&mut self, elem: T) -> Result<(), Error> {
        if self.buffer.len() < self.cap {
            self.buffer.push_back(elem);
            Ok(())
        } else {
            Err(Error::FullBuffer)
        }
    }

    pub fn read(&mut self) -> Result<T, Error> {
        self.buffer.pop_front().ok_or(Error::EmptyBuffer)
    }

    pub fn clear(&mut self) {
        self.buffer.clear()
    }

    pub fn overwrite(&mut self, elem: T) {
        match self.buffer.len() {
            _len if _len < self.cap => self.buffer.push_back(elem),
            _ => {
                let _ = self.buffer.pop_front();
                self.buffer.push_back(elem);
            }
        }
    }
}
