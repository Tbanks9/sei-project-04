# Generated by Django 2.2.9 on 2020-03-02 22:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photographyspots', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photographyspot',
            name='images',
        ),
    ]
