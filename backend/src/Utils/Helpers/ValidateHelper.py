
class ValidateHelper:
    @staticmethod
    def validate_request(request: dict, required: list) -> bool:
        for item in required:
            if item not in request:
                return False
        return True

  