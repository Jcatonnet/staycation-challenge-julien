import records
import stringcase


db = records.Database('postgres://staycation:password@localhost:5432/staycation')

def to_camel_case(obj):
    return { stringcase.camelcase(k): v for k, v in obj.items() }

def fetch_one(sql_query):
    return to_camel_case(db.query(sql_query).first().as_dict())

def fetch_many(sql_query):
    results = db.query(sql_query).all()
    return [to_camel_case(r.as_dict()) for r in results]
