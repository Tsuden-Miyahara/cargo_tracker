import { JSDOM } from 'jsdom' ;
import http from 'http';
import https from 'https';
import FormData from 'form-data';
import iconv from 'iconv-lite';

export const Kuroneko = async (pid: string): Promise<string> => {
    const url = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';
    const params = new URLSearchParams();
    params.append('mypagesession', '');
    params.append('backaddress', '');
    params.append('backrequest', '');
    params.append('category', '0');
    params.append('number01', pid);
    for (const n of [...Array(9).fill(0).map((_, i) => i + 2)]) {
        params.append(`number${('0' + n).slice(-2)}`, '');
    }
    const options: http.RequestOptions = {
        hostname: 'toi.kuronekoyamato.co.jp',
        path: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Length': Buffer.byteLength(params.getBuffer())
        }
    };
    const result: string = await new Promise((resolve, reject) => {
        try {
            let str = '';
            const req = https.request(options, res => {
                res.on('data', buf => {
                    str += buf.toString('utf8');
                });
            });
            req.on('close', () => {
                // console.log(req.getHeaders())
                const doc = new JSDOM(str).window.document;
                const stt = doc.querySelector('.tracking-invoice-block-state')?.outerHTML || '';
                const smr = doc.querySelector('.tracking-invoice-block-summary')?.outerHTML || '';
                const tgt = doc.querySelector('.tracking-invoice-block-detail')?.outerHTML || '';
                const content = [stt, smr, tgt].join('\n');
                // console.log(str)
                resolve(content)
            })
            req.on('error', reject);
            req.write(params.toString());
            req.end();
            // params.pipe(req);
        }
        catch(e) {
            reject(e);
        }
    });
    return result;
};

export const Sagawa = async (pid: string): Promise<string> => {
    const url = `https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?okurijoNo=${pid}`;
    const options: http.RequestOptions = {
        hostname: 'k2k.sagawa-exp.co.jp',
        path: url,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        }
    };
    const result: string = await new Promise((resolve, reject) => {
        try {
            let str = '';
            const req = https.request(options, res => {
                res.on('data', (buf: Buffer) => {
                    str += buf.toString('utf8');//iconv.decode(buf, 'Shift_JIS');
                });
            });
            req.on('close', () => {
                // console.log(req.getHeaders())
                const doc = new JSDOM(str).window.document;
                const _stt1 = doc.querySelector('#list1 .state')?.innerHTML || '';
                let _stt_clr = '';
                switch (_stt1) {
                    case '配達完了':
                        _stt_clr = 'is-complete-grey';
                        break;
                    case '該当なし':
                        _stt_clr = 'is-urgent-red';
                        break;
                    default: break;
                }
                const stt1 = `<div class="tracking-invoice-block-state-title">${_stt1}</div>`;
                const stt2 = `<div>${doc.querySelector('#list1 td[colspan="3"]')?.innerHTML || ''}</div>`.replace(/　/g, ' ').replace(/\s{2,}/g, '');
                const smr = [...doc.querySelectorAll('#detail1 > table')].map(e => e.outerHTML);
                const content = [`<div class="tracking-invoice-block-state ${_stt_clr}">${stt1}${stt2}</div>`, ...smr].join('\n');
                //console.log(str)
                resolve(content)
            })
            req.on('error', reject);
            req.end();
        }
        catch(e) {
            reject(e);
        }
    });
    return result;
};

export const Nihon = async (pid: string): Promise<string> => {
    const url = `https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=${pid}&requestNo2=&requestNo3=&requestNo4=&requestNo5=&requestNo6=&requestNo7=&requestNo8=&requestNo9=&requestNo10=&search.x=124&search.y=30&startingUrlPatten=&locale=ja`;
    const options: http.RequestOptions = {
        hostname: 'trackings.post.japanpost.jp',
        path: url,
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        }
    };
    const result: string = await new Promise((resolve, reject) => {
        try {
            let str = '';
            const req = https.request(options, res => {
                res.on('data', (buf: Buffer) => {
                    str += buf.toString('utf8');//iconv.decode(buf, 'Shift_JIS');
                });
            });
            req.on('close', () => {
                // console.log(req.getHeaders())
                const doc = new JSDOM(str).window.document;
                const con = doc.querySelector('.indent');
                if (con) {
                    const hts = [...con.querySelectorAll('.beige_box, .tableType01')].slice(0, 4).map(e => e.outerHTML);
                    const content = `<div>${hts.join('\n')}</div>`;
                    resolve(content)
                } else {
                    resolve('<div></div>')
                }
            })
            req.on('error', reject);
            req.end();
        }
        catch(e) {
            reject(e);
        }
    });
    return result;
};

export const Seino = async (pid: string): Promise<string> => {
    const url = 'https://track.seino.co.jp/kamotsu/GempyoNoShokai.do';
    const params = new URLSearchParams();
    params.append('questionnaire', '');
    params.append('action', '　検 索　');// "　検 索　", "%81%40%8C%9F+%8D%F5%81%40"
    params.append('GNPNO1', pid);
    for (const n of [...Array(8).fill(0).map((_, i) => i + 2)]) {
        params.append(`GNPNO${n}`, '');
    }
    params.append('GNPNOA', '');
    params.append('niokuriBannerFlag', '');
    params.append('tdkNameBannerFlag', '');
    params.append('autoShowMapFlg', '1');
    const options: http.RequestOptions = {
        hostname: 'track.seino.co.jp',
        path: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Length': Buffer.byteLength(params.getBuffer())
        }
    };
    const result: string = await new Promise((resolve, reject) => {
        try {
            let str = '';
            const req = https.request(options, res => {
                res.on('data', buf => {
                    str += iconv.decode(buf, 'Shift_JIS');
                });
            });
            req.on('close', () => {
                // console.log(req.getHeaders())
                const doc = new JSDOM(str).window.document;
                for (const e of doc.querySelectorAll('input')) {
                    e.remove();
                }
                for (const e of doc.querySelectorAll('*')) {
                    e.removeAttribute('style');
                }
                const stt = doc.querySelector('#divGempyoNo')?.outerHTML || '';
                const tbl = [...doc.querySelectorAll('table.base[class*="package"]')].map(e => e.outerHTML);;
                const content = [stt, ...tbl].join('\n');
                // console.log(str)
                resolve(content)
            })
            req.on('error', reject);
            req.write(params.toString());
            req.end();
            // params.pipe(req);
        }
        catch(e) {
            reject(e);
        }
    });
    return result;
};