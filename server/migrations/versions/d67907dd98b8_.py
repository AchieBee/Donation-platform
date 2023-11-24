"""empty message

Revision ID: d67907dd98b8
Revises: 
Create Date: 2023-11-24 15:49:49.706514

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd67907dd98b8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('charities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('donation_amount', sa.Integer(), nullable=True),
    sa.Column('stories', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('posted_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('paypal', sa.String(), nullable=True),
    sa.Column('bank', sa.String(), nullable=True),
    sa.Column('mpesa', sa.String(), nullable=True),
    sa.Column('skrill', sa.String(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('admins',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('news_title', sa.String(), nullable=True),
    sa.Column('news_image', sa.String(), nullable=True),
    sa.Column('news_text', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('beneficiaries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('stories', sa.String(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['charities.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_name', sa.String(), nullable=True),
    sa.Column('amount', sa.Integer(), nullable=True),
    sa.Column('charity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['charity_id'], ['beneficiaries.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('inventories')
    op.drop_table('beneficiaries')
    op.drop_table('admins')
    op.drop_table('accounts')
    op.drop_table('charities')
    op.drop_table('users')
    # ### end Alembic commands ###
