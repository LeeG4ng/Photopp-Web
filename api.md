用户操作
/user/login
    POST
        request
            username|string
            password|string
        response
            200 OK
            jwt|string
            400 Bad Request
            error|sting
/user/register
    POST
        request
            username|string
            password|string
        response
            200 OK
            jwt|string
            400 Bad Request
            error|string

图片操作
/image/upload
    POST
        request
            image|base64
            jwt|string
            gps|string
        response
            id|string
            location|string
            face|bool
/image/delete
    POST
        request
            jwt|string
            id|string
        response
            200 OK
            400 Bad Request
            error|string
/image/download
    POST
        request
            jwt|string
            id|array
        response
            [
                {
                    id|str
                    image|base64
                }
            ]
/image/classify
    POST
        request
            jwt|string
        response
            [
                {
                    id|string
                    location|string
                    face|bool
                }
            ]