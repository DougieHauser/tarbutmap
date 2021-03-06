# encoding=utf8
import requests
import json
import codecs

GOOGLE_MAPS_API_KEY = <ADD_KEY>
GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s'  # encoded_address, key
CITY_LIST = [
    'אבו גוש', 'אבו סנאן', 'אבירים', 'אבן יהודה', 'אום אל-פחם', 'אום-אל-פחם', 'אופקים', 'אור יהודה', 'אור עקיבא',
    'אורנית', 'אזור', 'איכסאל', 'אילון', 'אילת', 'איעבלין', 'אכסאל', 'אל-טירה', 'אל-פחם','אלון מורה',
    'אלון שבות', 'אליכין', 'אלעד', 'אלפי מנשה', 'אלקנה', 'אעבלין', 'אפרת', 'אפרתה', 'אריאל', 'אשדוד', 'אשכול', 'אשקלון',
    'אשרת', 'באקה אל-גרביה','באר יעקב', 'באר שבע', 'בארות יצחק', 'בועיינה-נוגיידאת','בוקעאתא','ביענה','ביר אל-מכסור',
    'בית אל', 'בית אריה', 'בית ברל', 'בית ג\'ן', 'בית גדן','בית השיטה', 'בית קמה', 'בית שאן', 'בית-גן', 'בית-שאן',
    'בית-שמש', 'ביתר', 'ביתר עילית', 'בן שמן','בני ברק','בני עיש', 'בנימין','בנימינה', 'בנימינה-גבעת עדה','בסמה','בסמת טבעון',
    'ברכה', 'ברעם', 'בת-ים', 'ג\'דיידה-מכר', 'ג\'ולס','גבע','גבעת אלה','גבעת זאב','גבעת חביבה','גבעת חיים','גבעת שמואל',
    'גבעתיים','גבת', 'גדרה', 'גוליס', 'גוש חלב','גזר','גינוסר','גיסר אל זרקא','גלגוליה','גליל מערבי','גליל עליון','גן יבנה','גני עם',
    'גני תקוה','געתון','גשר','גת','דאלית אל-כרמל', 'דבוריה', 'דבורייה', 'דגניה א\'','דייר אל-אסד','דייר-חנא','דימונה', 'דיר אל-אסד',
    'דיר חנא','דלית אל כרמל','הוד השרון','הזורע','הרצליה','זכרון יעקב','זמר','זרזיר','חדרה','חולון','חופית','חורה', 'חורפיש','חיפה',
    'חנתון', 'חצור הגלילית','חצרים', 'חריש','חשמונאים', 'טבריה', 'טובא-זנגריה','טורעאן','טייבה','טירת כרמל','טמרה', 'יבנאל', 'יבנה',
    'יד בנימין','יד מרדכי','יהוד מונוסון','יהוד-מונוסון','יהודה','יוסף','ינוח גת','ינינה','יסוד המעלה','יפיע','יפעת','יקום','יקנעם עילית','יראון',
    'ירוחם','ירושלים','ירכא','כאבול','כאוכב אבו אלהיגא','כוכב השחר','כסיפה','כסרא סמיע','כעבייה-טבאש-חגאגרה','כפר הרא"ה','כפר ורדים',
    'כפר יאסיף','כפר יונה','כפר יסיף','כפר כמא','כפר כנא','כפר מנדא','כפר סבא','כפר קאסם','כפר קמה','כפר קרע','כפר שמריהו','כפר-ברא',
    'כפר-כנא','כרמיאל','להב','להבים','לוד','לקיה','מ.א. אבו בסמה','מ.א. אל-בטוף','מ.א. אלונה','מ.א. אשכול','מ.א. באר-טוביה',
    'מ.א. בוסתאן אל-מרג','מ.א. גדרות','מ.א. גולן','מ.א. גוש עציון','מ.א. גזר','מ.א. הגלבוע','מ.א. הגליל העליון','מ.א. הגליל התחתון',
    'מ.א. הערבה התיכונה','מ.א. הר חברון','מ.א. זבולון','מ.א. חבל אילות','מ.א. חבל יבנה','מ.א. חבל מודיעין','מ.א. חוף אשקלון',
    'מ.א. חוף הכרמל','מ.א. יואב','מ.א. לב השרון','מ.א. לכיש','מ.א. מבואות','מ.א. מבואות החרמון','מ.א. מגידו','מ.א. מגילות ים המלח',
    'מ.א. מטה אשר','מ.א. מטה בנימין','מ.א. מטה יהודה','מ.א. מנשה','מ.א. מעלה יוסף','מ.א. מרום הגליל','מ.א. מרחבים',
    'מ.א. משגב','מ.א. נחל שורק','מ.א. עמק הירדן','מ.א. עמק המעיינות','מ.א. עמק חפר','מ.א. עמק יזראל','מ.א. עמק לוד',
    'מ.א. ערבות הירדן','מ.א. רמת נגב','מ.א. שדות נגב','מ.א. שומרון','מ.א. שער הנגב','מ.א. שפיר','מ.א. תמר',
    'מבשרת ציון','מג\'ד אל כרום','מגאר','מגד אל-כרום','מגדל העמק','מגדל שמס','מודיעין עילית','מודיעין-מכבים-רעות','מזכרת בתיה',
    'מזרעה','מטולה','מסעדה','מעברות','מעיליא','מעין ברוך','מעלה אדומים','מעלה אפרים','מעלה עירון','מעלות תרשיחא','מעלות-תרשיחא',
    'מצפה רמון','מקווה ישראל','מרחביה','מרכז שפירא','משגב','משהד','נבטים','נהריה','נהרייה','נחף','נחשולים','ניר גלים','נס ציונה',
    'נצרת', 'נצרת עילית', 'נשר', 'נתיבות', 'נתניה', 'סאגור', 'סאסא','סח\'נין', 'סחנין','סעד','עומר','עוספייא','עילבון',
    'עילוט','עימנואל','עין דור','עין הוד','עין חרוד','עין מאהל','עין צורים','עין קיניה','עין שמר','עין-כרם','עכו','עמק הירדן',
    'עמק חפר','עספיא','עפולה','עפרה','עקיבא','עראבה','ערד','ערערה','ערערה-בנגב','פלמחים','פסוטה','פקיעין','פרדס חנה-כרכור','פרדס-חנה-כרכור',
    'פרדסיה', 'פרס חנה-כרכור','פתח תקוה', 'פתח תקווה', 'צומת ראם','צמח','צפת','צרעה', 'קדומים', 'קיבוץ חניתה', 'קיבוץ לוחמי הגיטאות',
    'קיבוץ מעגן מיכאל', 'קלנסווה','קצרין', 'קריית אונו','קריית ארבע','קריית טבעון','קריית מלאכי','קריית שמונה','קרית ארבע','קרית אתא',
    'קרית ביאליק','קרית גת', 'קרית טבעון', 'קרית ים', 'קרית יערים', 'קרית מוצקין', 'קרית מלאכי', 'קרית עקרון', 'קרית שמונה', 'קרני שומרון',
    'ראמה', 'ראש העין', 'ראש פינה', 'ראשון לציון','רביבים','רהט','רחובות','ריחאניה','ריינה', 'רכסים', 'רמלה','רמת גן','רמת השרון',
    'רעננה', 'רשפון','שבלי', 'שגב-שלום', 'שדה בוקר', 'שדרות', 'שהם', 'שלומי', 'שמר', 'שעב', 'שעלבים', 'שער הגולן', 'שער הנגב',
    'שפרעם', 'שקמים', 'תירוש', 'תל אביב - יפו', 'תל יצחק', 'תל מונד', 'תל שבע', 'תמר', 'תקווה', 'תקוע'
]

results = []


def get_city_info(cities):
    for city in cities:
        url_encoded_city = city
        composed_url = GOOGLE_MAPS_API_URL % (url_encoded_city, GOOGLE_MAPS_API_KEY)
        res = requests.get(composed_url)
        json_res = json.loads(res.text)
        assert json_res['status'] == 'OK', 'Status %s is not OK for city: %s' % (json_res['status'], city)

        city_info = json_res['results'][0]
        location = city_info['geometry']['location']
        dict_res = {
            'city': city,
            'formatted_address': city_info['formatted_address'],
            'latitude': location['lat'],
            'longitude': location['lng'],
            'types': city_info['types']
        }

        results.append(dict_res)
        print dict_res

    return results


results = get_city_info(CITY_LIST)

f = codecs.open('results.json', 'w')
f.write('{\n')
try:
    for result in results:
        f.write('\"' + result['city'] + '\": {' +
                  '\"formatted_address\": \"' + result['formatted_address'].encode('utf-8') + '\", ' +
                 '\"latitude\": \"' + str(result['latitude']) + '\", ' +
                 '\"longitude\": \"' + str(result['longitude']) + '\", ' +
                '\"types\": \"' + ', '.join(result['types']).encode('utf-8') + '\"' + '},\n'
                )
except Exception as e:
    print e

f.write('}')
f.close()
