from abc import ABC, abstractmethod

class Repository(ABC):
    
    @abstractmethod
    def find_all(self):
        pass
    
    @abstractmethod
    def find_by_id(self):
        pass
    
    @abstractmethod
    def insert(self):
        pass
    
    @abstractmethod
    def update(self):
        pass
    
    @abstractmethod
    def delete(self):
        pass
    
    @abstractmethod
    def to_JSON(self):
        pass
