"""empty message

Revision ID: 1462bd1e4db
Revises: None
Create Date: 2015-09-03 12:26:35.205338

"""

# revision identifiers, used by Alembic.
revision = '1462bd1e4db'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cookies',
    sa.Column('cookie_id', sa.Integer(), nullable=False),
    sa.Column('cookie_name', sa.String(length=50), nullable=True),
    sa.Column('cookie_recipe_url', sa.String(length=255), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('cookie_id')
    )
    op.create_index(op.f('ix_cookies_cookie_name'), 'cookies', ['cookie_name'], unique=False)
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=True),
    sa.Column('password_hash', sa.String(length=255), nullable=True),
    sa.Column('api_key', sa.String(length=50), nullable=True),
    sa.Column('authenticated', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('username')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_index(op.f('ix_cookies_cookie_name'), table_name='cookies')
    op.drop_table('cookies')
    ### end Alembic commands ###