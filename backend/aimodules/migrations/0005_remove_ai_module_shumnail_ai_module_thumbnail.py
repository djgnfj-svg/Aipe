# Generated by Django 4.2.11 on 2024-04-06 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aimodules', '0004_ai_module_shumnail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ai_module',
            name='shumnail',
        ),
        migrations.AddField(
            model_name='ai_module',
            name='thumbnail',
            field=models.ImageField(default='images/gear.png', upload_to='images/'),
        ),
    ]