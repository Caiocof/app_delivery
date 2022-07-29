import re
from uuid import UUID
from sqlalchemy.orm import Session
from src.shared.utils import UtilService
from src.shared.providers import hash_provider
from src.schemas.utils_schema import ValidateDocs
from src.exceptions.excepetions import BadRequestException, NotFoundException

from src.controllers.base import BaseController
from src.db.cruds.tenant_crud import TenantCRUD
from src.schemas.tenant_schema import TenantBase, TenantUpdate


class TenantController(BaseController):

    def __init__(self):
        super(TenantController, self).__init__(TenantCRUD)

    def __document_validate(self, number: str):
        type_doc = 'cpf' if len(number) <= 11 else 'cnpj'
        document = ValidateDocs(type_doc=f'{type_doc}', number=number)

        if not UtilService.validate_doc(document).get('valid'):
            raise BadRequestException('Documento invalido!')

        return re.sub(r'\W+', '', number)

    def handle_create(self, db: Session, data: TenantBase, commit=True):
        data.document = TenantController.__document_validate(self, number=data.document)
        data.password = hash_provider.get_password_hash(data.password)
        data.main_color = {
            'primary': data.main_color.primary,
            'secondary': data.main_color.secondary
        }

        return self.crud_class().create(db, data, commit)

    def handle_patch(self, db: Session, object_id: UUID, data: TenantUpdate, commit=True):
        tenant = self.crud_class().get(db=db, id=object_id)

        if tenant is None:
            raise NotFoundException('Tenant not Found')

        TenantController.__document_validate(self, number=data.document)

        return self.crud_class().patch(db, object_id, data, commit)
