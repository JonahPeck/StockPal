#imports 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from services import bcrypt,db

metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_`%(constraint_name)s`",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
    })

# db = SQLAlchemy(metadata=metadata)

class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique = True)
    email = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    portfolio = db.relationship("Portfolio", backref = "user")
    

    serialize_rules = ('-portfolio.user', '-created_at', '-updated_at')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

    #add validation for the name
    @validates('email')
    def check_email(self, key, email):
        if "@" in email:
            return email
        else:
            raise Exception("Not Valid Email")

class StockList(db.Model, SerializerMixin):
    __tablename__ = 'stock_list'

    id = db.Column(db.Integer, primary_key = True)
    #will need to be adjusted based on API found to be used 
    name = db.Column(db.String, unique = True)
    symbol = db.Column(db.String)
    sector = db.Column(db.String)
    logo = db.Column(db.String)
    #chart addition
    portfolio = db.relationship("Portfolio", backref = "stocks")
    serialize_rules = ('-portfolio.stocks', '-created_at', '-updated_at')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

class Portfolio(db.Model, SerializerMixin):
    __tablename__ = "portfolios"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stock_list.id'))
    portfolio_name = db.Column(db.String, nullable = False)
    tracked_stock = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    serialize_rules = ('-user.portfolio', '-stocks.portfolio','-created_at','-updated_at')


    

