from re import search
from requests import get
from validate_docbr import CNPJ, CPF, CNH, RENAVAM
from src.schemas.utils_schema import ValidateDocs


class UtilService:
    @staticmethod
    def validate_doc(docs_data: ValidateDocs):
        valid = False
        if docs_data.type_doc.lower() == 'cpf':
            valid = CPF().validate(docs_data.number)
        elif docs_data.type_doc.lower() == 'cnpj':
            valid = CNPJ().validate(docs_data.number)
        elif docs_data.type_doc.lower() == 'cnh':
            valid = CNH().validate(docs_data.number)
        elif docs_data.type_doc.lower() == 'renavam':
            valid = RENAVAM().validate(docs_data.number)

        return {'valid': valid}

    @staticmethod
    def validate_cep(cep_number: int = None):
        if len(str(cep_number)) != 8:
            raise NameError('O códigos Postal no Brasil consistem em 8 números')

        result = get(f'https://viacep.com.br/ws/{cep_number}/json/').json()

        if result.get('erro'):
            raise ValueError('Cep não encontrado.')
        return result

    @staticmethod
    def validate_email(email: str = None):
        regex = '^[\\w.\\-#_$%*]{2,50}@\\w+[.\\-_]?\\w+.\\w{2,3}[.\\w{2}]?$'

        if email is None:
            raise NameError('Por favor informe o e-mail a ser validado.')
        elif search(regex, email):
            return True
        else:
            return False

    @staticmethod
    def validate_phone(phone: str = None):
        regex = '^\\(?\\d{2}\\)?[ ]?\\d{1}[. ]?\\d{4}[- ]?\\d{4}$'

        if phone is None:
            raise NameError('Por favor informe o telefone a ser validado.')
        elif search(regex, phone):
            return True
        else:
            return False
