import re
from typing import Union
from uuid import UUID
from sqlalchemy.orm import Session

from src.shared.utils import UtilService
from src.shared.providers import hash_provider
from src.exceptions.excepetions import BadRequestException, NotFoundException

from src.controllers.base import BaseController
from src.db.cruds.tenant_crud import TenantCRUD
from src.schemas.tenant_schema import TenantBase, TenantUpdate
from src.schemas.utils_schema import ValidateDocs


class TenantController(BaseController):

    def __init__(self):
        super(TenantController, self).__init__(TenantCRUD)

    def __clean_form(self, data: Union[TenantBase, TenantUpdate]):
        new_form = UtilService.remove_none_in_form(data)

        if data.document:
            type_doc = 'cpf' if len(data.document) <= 11 else 'cnpj'
            document = ValidateDocs(type_doc=f'{type_doc}', number=data.document)

            if not UtilService.validate_doc(document).get('valid'):
                raise BadRequestException('Documento invalido.')

            new_form['document'] = re.sub(r'\W+', '', data.document)

        return new_form

    def handle_create(self, db: Session, data: TenantBase, commit=True):
        new_data = TenantController.__clean_form(self, data=data)
        tenant = self.crud_class().get(db=db, document=new_data['document'])

        if tenant:
            raise BadRequestException('Documento já registrado.')

        new_data['password'] = hash_provider.get_password_hash(data.password)
        new_data['main_color'] = {
            'primary': data.main_color.primary,
            'secondary': data.main_color.secondary
        }
        return self.crud_class().create(db=db, data=new_data, commit=commit)

    def handle_patch(self, db: Session, object_id: UUID, data: TenantUpdate, commit=True):
        tenant = self.crud_class().get(db=db, id=object_id)

        if tenant is None:
            raise NotFoundException('Tenante não encontrado.')

        new_data = TenantController.__clean_form(self, data=data)

        return self.crud_class().patch(db=db, object_id=object_id, data=new_data, commit=commit)
