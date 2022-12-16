import requests
import psutil

threshold = 1
partition = "/"

def telegram_bot_sendtext(bot_message):

    bot_token = '747998572:AAEgybVE58uz8CHY0XKEHZQBxlE-VSRTRek'
    bot_chatID = '-398595413'
    send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)

    return response.json()


def check_disk_usage():
    obj_Disk = psutil.disk_usage(partition)
    free_space = round(obj_Disk.free / (1024.0 ** 3),2)

    print(free_space)

    if(free_space < threshold):
        message = "There is only %s GB free space left on the disk where PKID is hosted. @tchielens @Jonaswijne @jdelrue" % (free_space)
        print (message)
        telegram_bot_sendtext(message)

check_disk_usage()
