export const client = {
    cn: {
        title: 'Basic for Developers',
        document: '云账号 API Key 是您访问Basic API 的密钥，请您务必妥善保管！',
        welcome: {
            morning: '早上好：{nickname}',
            midday: '中午好：{nickname}',
            afternoon: '下午好：{nickname}',
            night: '晚上好：{nickname}'
        },
        language: {
            value: '语言',
            column: [
                { label: '中文', value: 'cn' },
                { label: 'English', value: 'en' }
            ]
        },
        screen: {
            full: '全屏',
            fout: '退出全屏'
        },
        theme: {
            dark: '深色',
            light: '浅色'
        },
        service: {
            title: '产品和服务',
            document: '我们为您提供多样化的产品和服务，以满足您的各种需求和追求。',
            column: [
                { icon: 'Captcha', name: '人机验证', path: '/captchar', document: '致力于为客户提供高效、安全的人机验证解决方案。' },
                { icon: 'Message', name: '短信', path: '/message', document: '致力于为客户提供高质量、可靠的短信解决方案。' },
                { icon: 'MailGmail', name: '邮件', path: '/mailer', document: '致力于为客户提供高效可靠的邮件解决方案。' }
            ]
        },
        basic: {
            userId: '账号 ID: {uid}',
            balance: '余额',
            credit: '信用额度',
            settings: '账号设置',
            logout: '退出登录'
        }
    },
    en: {
        title: 'Basic for Developers',
        document: 'The cloud account API Key is your key to access the Basic API, please keep it safe!',
        welcome: {
            morning: 'Welcome: {nickname}',
            midday: 'Welcome: {nickname}',
            afternoon: 'Welcome: {nickname}',
            night: 'Welcome: {nickname}'
        },
        language: {
            value: 'Language',
            column: [
                { label: '中文', value: 'cn' },
                { label: 'English', value: 'en' }
            ]
        },
        screen: {
            full: 'Full screen',
            fout: 'Exit Full Screen'
        },
        theme: {
            dark: 'Dark',
            light: 'Light'
        },
        service: {
            title: 'Products and Services',
            document: 'We provide you with diversified products and services to meet your various needs and pursuits.',
            column: [
                {
                    icon: 'Captcha',
                    name: 'CAPTCHA',
                    path: '/captchar',
                    document: 'Committed to providing customers with efficient and safe man-machine verification solutions.'
                },
                {
                    icon: 'Message',
                    name: 'SMS',
                    path: '/message',
                    document: 'Committed to providing customers with high-quality, reliable SMS solutions.'
                },
                {
                    icon: 'MailGmail',
                    name: 'Email',
                    path: '/mailer',
                    document: 'Committed to providing customers with efficient and reliable mail solutions.'
                }
            ]
        },
        basic: {
            userId: 'User ID: {uid}',
            balance: 'Balance',
            credit: 'Credit',
            settings: 'Settings',
            logout: 'Logout'
        }
    }
}
