# Generated by Django 2.0 on 2018-09-15 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20180913_0143'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
