import axios from 'axios'
import appConfig from '@/configs/app.config'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'

const unauthorizedCode = [401]

const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

function simpleSign(ts: number, rand: number) {
    const secret = "k9xA"; // chỉ là nhiễu, không phải bí mật thật
    return btoa(`${ts ^ rand}${secret}`).slice(0, 16);
  }

BaseService.interceptors.request.use(
    (config) => {
        const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
        const persistData = deepParseJson(rawPersistData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const language = (persistData as any)?.locale?.currentLang || "vi"
        config.headers["x-app-language"] = language

        const ts = Date.now();
        const rand = crypto.getRandomValues(new Uint32Array(1))[0];
      
        config.headers["X-Client-Time"] = ts;
        config.headers["X-Noise"] = rand.toString(16);
        config.headers["X-Signature"] = simpleSign(ts, rand);
        config.headers["X-Jitter"] = Math.floor(performance.now() % 97);
        config.headers["X-Env"] = [navigator.hardwareConcurrency,screen.width,screen.height].join("x");
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
        }

        return Promise.reject(error)
    }
)

export default BaseService