dev_server:
	uvicorn src.main:app --host=127.0.0.1 --port=8080 --reload --reload-dir=src

db_revision:
	alembic revision --autogenerate -m $(message)

db_create:
	alembic upgrade head

db_rollback:
	alembic downgrade -1

tests:
	pytest ./src/
