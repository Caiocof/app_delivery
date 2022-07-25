from uuid import UUID
from sqlalchemy.orm import Session
from src.shared.utils import UtilService
from src.schemas.utils_schema import ValidateDocs
from src.exceptions.excepetions import BadRequestException, NotFoundException

from src.controllers.base import BaseController
from src.db.cruds.tenant_crud import TenantCRUD
from src.schemas.tenant_schema import TenantBase


class TenantController(BaseController):

    def __init__(self):
        super(TenantController, self).__init__(TenantCRUD)

    def handle_create(self, db: Session, data: TenantBase, commit=True):
        type_doc = 'cpf' if len(data.document) <= 11 else 'cnpj'
        document = ValidateDocs(type_doc=f'{type_doc}', number=data.document)

        if not UtilService.validate_doc(document).get('valid'):
            raise BadRequestException('Documento invalido!')

        return self.crud_class().create(db, data, commit)

    def handle_patch(self, db: Session, object_id: UUID, data: TenantBase, commit=True):
        tenant = self.crud_class().get(db=db, id=object_id)

        if tenant is None:
            raise NotFoundException('Tenant not Found')

        type_doc = 'cpf' if len(data.document) <= 11 else 'cnpj'
        document = ValidateDocs(type_doc=f'{type_doc}', number=data.document)

        if not UtilService.validate_doc(document).get('valid'):
            raise BadRequestException('Documento invalido!')

        return self.crud_class().patch(db, object_id, data, commit)
