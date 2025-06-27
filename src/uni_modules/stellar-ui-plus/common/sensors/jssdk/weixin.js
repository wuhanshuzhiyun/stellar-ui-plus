const sa = {}
const saPara = {
  name: 'sensors',
  server_url: '',
  send_timeout: 1e3,
  show_log: !1,
  login_id_key: '$identity_login_id',
  allow_amend_share_path: !0,
  max_string_length: 500,
  datasend_timeout: 3e3,
  source_channel: [],
  autoTrack: {
    appLaunch: !0,
    appShow: !0,
    appHide: !0,
    pageShow: !0,
    pageShare: !0,
    mpClick: !1,
    mpFavorite: !0,
    pageLeave: !1,
  },
  autotrack_exclude_page: { pageShow: [], pageLeave: [] },
  is_persistent_save: { share: !1, utm: !1 },
  preset_properties: { url_path: !0 },
  preset_events: { moments_page: !1, defer_track: !1, share_info_use_string: !1 },
  batch_send: !0,
  storage_store_key: 'sensorsdata2015_wechat',
  storage_prepare_data_key: 'sensors_mp_prepare_data',
}
function log() {
  if (saPara.show_log && typeof console === 'object' && console.log)
    try {
      return console.log.apply(console, arguments)
    } catch (e) {
      console.log(arguments[0])
    }
}
const nativeIsArray = Array.isArray
const ObjProto = Object.prototype
const ArrayProto = Array.prototype
const nativeForEach = ArrayProto.forEach
const nativeIndexOf = ArrayProto.indexOf
const toString = ObjProto.toString
const hasOwnProperty = ObjProto.hasOwnProperty
const slice = ArrayProto.slice
function each(e, t, a) {
  if (e == null) return !1
  const i = {}
  if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, a)
  else if (e.length === +e.length) {
    for (let r = 0, n = e.length; r < n; r++) if (r in e && t.call(a, e[r], r, e) === i) return !1
  } else for (const s in e) if (hasOwnProperty.call(e, s) && t.call(a, e[s], s, e) === i) return !1
}
function isObject(e) {
  return e != null && toString.call(e) == '[object Object]'
}
const getRandomBasic = (function () {
  let e = new Date().getTime()
  return function (t) {
    return Math.ceil(((e = (9301 * e + 49297) % 233280) / 233280) * t)
  }
})()
function getRandom() {
  if (typeof Uint32Array === 'function') {
    let e = ''
    if (
      (typeof crypto !== 'undefined'
        ? (e = crypto)
        : typeof msCrypto !== 'undefined' && (e = msCrypto),
      isObject(e) && e.getRandomValues)
    ) {
      const t = new Uint32Array(1)
      return e.getRandomValues(t)[0] / Math.pow(2, 32)
    }
  }
  return getRandomBasic(1e19) / 1e19
}
function extend(e) {
  return (
    each(slice.call(arguments, 1), function (t) {
      for (const a in t) void 0 !== t[a] && (e[a] = t[a])
    }),
    e
  )
}
function extend2Lev(e) {
  return (
    each(slice.call(arguments, 1), function (t) {
      for (const a in t)
        void 0 !== t[a] &&
          t[a] !== null &&
          (isObject(t[a]) && isObject(e[a]) ? extend(e[a], t[a]) : (e[a] = t[a]))
    }),
    e
  )
}
function coverExtend(e) {
  return (
    each(slice.call(arguments, 1), function (t) {
      for (const a in t) void 0 !== t[a] && void 0 === e[a] && (e[a] = t[a])
    }),
    e
  )
}
const isArray =
  nativeIsArray ||
  function (e) {
    return toString.call(e) === '[object Array]'
  }
function isFunction(e) {
  if (!e) return !1
  const t = Object.prototype.toString.call(e)
  return t == '[object Function]' || t == '[object AsyncFunction]'
}
function isArguments(e) {
  return !(!e || !hasOwnProperty.call(e, 'callee'))
}
function toArray(e) {
  return e
    ? e.toArray
      ? e.toArray()
      : isArray(e)
        ? slice.call(e)
        : isArguments(e)
          ? slice.call(e)
          : values(e)
    : []
}
function values(e) {
  const t = []
  return e == null
    ? t
    : (each(e, function (e) {
        t[t.length] = e
      }),
      t)
}
function include(e, t) {
  let a = !1
  return e == null
    ? a
    : nativeIndexOf && e.indexOf === nativeIndexOf
      ? e.indexOf(t) != -1
      : (each(e, function (e) {
          if (a || (a = e === t)) return {}
        }),
        a)
}
function trim(e) {
  return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}
function isEmptyObject(e) {
  if (isObject(e)) {
    for (const t in e) if (hasOwnProperty.call(e, t)) return !1
    return !0
  }
  return !1
}
function deepCopy(e) {
  const t = {}
  return (
    (function e(t, a) {
      for (const i in a) {
        const r = a[i]
        isArray(r)
          ? ((t[i] = []), e(t[i], r))
          : isObject(r)
            ? ((t[i] = {}), e(t[i], r))
            : (t[i] = r)
      }
    })(t, e),
    t
  )
}
function isUndefined(e) {
  return void 0 === e
}
function isString(e) {
  return toString.call(e) == '[object String]'
}
function isDate(e) {
  return toString.call(e) == '[object Date]'
}
function isBoolean(e) {
  return toString.call(e) == '[object Boolean]'
}
function isNumber(e) {
  return toString.call(e) == '[object Number]' && /[\d\\.]+/.test(String(e))
}
function isJSONString(e) {
  try {
    JSON.parse(e)
  } catch (e) {
    return !1
  }
  return !0
}
const isInteger =
  Number.isInteger ||
  function (e) {
    return typeof e === 'number' && isFinite(e) && Math.floor(e) === e
  }
const isSafeInteger =
  Number.isSafeInteger ||
  function (e) {
    return isInteger(e) && Math.abs(e) <= Math.pow(2, 53) - 1
  }
var urlSafeBase64 = {
  ENC: { '+': '-', '/': '_', '=': '.' },
  DEC: { '-': '+', _: '/', '.': '=' },
  encode: function (e) {
    return e.replace(/[+\/=]/g, function (e) {
      return urlSafeBase64.ENC[e]
    })
  },
  decode: function (e) {
    return e.replace(/[-_.]/g, function (e) {
      return urlSafeBase64.DEC[e]
    })
  },
  trim: function (e) {
    return e.replace(/[.=]{1,2}$/, '')
  },
  isBase64: function (e) {
    return /^[A-Za-z0-9+\/]*[=]{0,2}$/.test(e)
  },
  isUrlSafeBase64: function (e) {
    return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(e)
  },
}
const SOURCE_CHANNEL_STANDARD = 'utm_source utm_medium utm_campaign utm_content utm_term'
const LATEST_SOURCE_CHANNEL = [
  '$latest_utm_source',
  '$latest_utm_medium',
  '$latest_utm_campaign',
  '$latest_utm_content',
  '$latest_utm_term',
  '$latest_sa_utm',
]
const LATEST_SHARE_INFO = [
  '$latest_share_distinct_id',
  '$latest_share_url_path',
  '$latest_share_depth',
  '$latest_share_method',
]
const SHARE_INFO_KEY = ['sensors_share_d', 'sensors_share_p', 'sensors_share_i', 'sensors_share_m']
const MP_FILTER_HOOK = {
  data: 1,
  onLoad: 1,
  onShow: 1,
  onReady: 1,
  onPullDownRefresh: 1,
  onShareAppMessage: 1,
  onShareTimeline: 1,
  onReachBottom: 1,
  onPageScroll: 1,
  onResize: 1,
  onTabItemTap: 1,
  onHide: 1,
  onUnload: 1,
}
const IDENTITY_KEY = {
  EMAIL: '$identity_email',
  MOBILE: '$identity_mobile',
  LOGIN: '$identity_login_id',
}
const LIB_VERSION = '1.20.2'
const LIB_NAME = 'MiniProgram'
const meta = {
  init_status: !1,
  life_state: { app_launched: !1 },
  plugin: { init_list: [], uninitialized_list: [] },
  privacy: { enable_data_collect: !1 },
  initialState: { queue: [], isComplete: !1 },
  preset_properties: { $lib: LIB_NAME, $lib_version: LIB_VERSION },
  promise_list: [],
  query_share_depth: 0,
  page_show_time: Date.now(),
  mp_show_time: null,
  share_distinct_id: '',
  share_method: '',
  current_scene: '',
  is_first_launch: !1,
  wx_sdk_version: '',
  global_title: {},
  page_route_map: [],
}
function getAppInfoSync() {
  if (wx.getAccountInfoSync) {
    const e = wx.getAccountInfoSync()
    const t = e && e.miniProgram ? e.miniProgram : {}
    return { appId: t.appId, appEnv: t.envVersion, appVersion: t.version }
  }
  return {}
}
function getAppId() {
  const e = getAppInfoSync()
  return e && e.appId ? e.appId : ''
}
function getOpenidNameByAppid() {
  const e = getAppId()
  let t = '$identity_mp_openid'
  return e && (t = '$identity_mp_' + e + '_openid'), t
}
function rot13defs(e) {
  return rot13obfs((e = String(e)), 113)
}
function rot13obfs(e, t) {
  t = typeof t === 'number' ? t : 13
  for (var a = (e = String(e)).split(''), i = 0, r = a.length; i < r; i++) {
    a[i].charCodeAt(0) < 126 && (a[i] = String.fromCharCode((a[i].charCodeAt(0) + t) % 126))
  }
  return a.join('')
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty
var store = {
  storageInfo: null,
  store_queue: [],
  getUUID: function () {
    return (
      Date.now() +
      '-' +
      Math.floor(1e7 * getRandom()) +
      '-' +
      getRandom().toString(16).replace('.', '') +
      '-' +
      String(31242 * getRandom())
        .replace('.', '')
        .slice(0, 8)
    )
  },
  getStorage: function () {
    return this.storageInfo
      ? this.storageInfo
      : ((this.storageInfo = sa._.getStorageSync(saPara.storage_store_key) || ''), this.storageInfo)
  },
  _state: {},
  mem: {
    mdata: [],
    getLength: function () {
      return this.mdata.length
    },
    add: function (e) {
      this.mdata.push(e)
    },
    clear: function (e) {
      this.mdata.splice(0, e)
    },
  },
  toState: function (e) {
    let t = null
    const a = this
    function i() {
      t.distinct_id ? (a._state = t) : a.set('distinct_id', a.getUUID())
    }
    isJSONString(e)
      ? ((t = JSON.parse(e)), i())
      : isObject(e)
        ? ((t = e), i())
        : this.set('distinct_id', this.getUUID())
    const r = this._state._first_id || this._state.first_id
    const n = this._state._distinct_id || this._state.distinct_id
    const s = this._state.openid
    const o = (this._state.history_login_id ? this._state.history_login_id : {}).name
    if (this._state.identities && isString(this._state.identities)) {
      const u = JSON.parse(rot13defs(this._state.identities))
      this._state.identities = u
    }
    let c
    let p
    const d = getOpenidNameByAppid()
    if (
      this._state.identities &&
      isObject(this._state.identities) &&
      !isEmptyObject(this._state.identities)
    ) {
      const l = ((c = getAppId()), (p = '$mp_openid'), c && (p = '$mp_' + c + '_openid'), p)
      hasOwnProperty$1.call(this._state.identities, '$mp_id') &&
        ((this._state.identities.$identity_mp_id = this._state.identities.$mp_id),
        delete this._state.identities.$mp_id),
        hasOwnProperty$1.call(this._state.identities, '$mp_unionid') &&
          ((this._state.identities.$identity_mp_unionid = this._state.identities.$mp_unionid),
          delete this._state.identities.$mp_unionid),
        hasOwnProperty$1.call(this._state.identities, l) &&
          ((this._state.identities[d] = this._state.identities[l]),
          delete this._state.identities[l])
    } else (this._state.identities = {}), (this._state.identities.$identity_mp_id = this.getUUID())
    function _(e) {
      for (const t in store._state.identities)
        hasOwnProperty$1.call(store._state.identities, t) &&
          t !== '$identity_mp_id' &&
          t !== e &&
          delete store._state.identities[t]
    }
    s && (this._state.identities[d] = s),
      r
        ? o && hasOwnProperty$1.call(this._state.identities, o)
          ? this._state.identities[o] !== n &&
            ((this._state.identities[o] = n), _(o), (this._state.history_login_id.value = n))
          : ((this._state.identities[IDENTITY_KEY.LOGIN] = n),
            _(IDENTITY_KEY.LOGIN),
            (this._state.history_login_id = { name: IDENTITY_KEY.LOGIN, value: n }))
        : (this._state.history_login_id = { name: '', value: '' }),
      this.save()
  },
  getFirstId: function () {
    return this._state._first_id || this._state.first_id
  },
  getDistinctId: function () {
    const e = this.getLoginDistinctId()
    return e || this._state._distinct_id || this._state.distinct_id
  },
  getUnionId: function () {
    const e = {}
    const t = this._state._first_id || this._state.first_id
    const a = this.getDistinctId()
    return t && a ? ((e.login_id = a), (e.anonymous_id = t)) : (e.anonymous_id = a), e
  },
  getHistoryLoginId: function () {
    return isObject(this._state.history_login_id) ? this._state.history_login_id : null
  },
  getLoginDistinctId: function () {
    const e = this.getHistoryLoginId()
    return isObject(e) && e.value
      ? e.name !== IDENTITY_KEY.LOGIN
        ? e.name + '+' + e.value
        : e.value
      : null
  },
  getProps: function () {
    return this._state.props || {}
  },
  setProps: function (e, t) {
    const a = this._state.props || {}
    t ? this.set('props', e) : (extend(a, e), this.set('props', a))
  },
  set: function (e, t) {
    let a = {}
    for (const i in (typeof e === 'string' ? (a[e] = t) : typeof e === 'object' && (a = e),
    (this._state = this._state || {}),
    a))
      (this._state[i] = a[i]),
        i === 'first_id'
          ? delete this._state._first_id
          : i === 'distinct_id' &&
            (delete this._state._distinct_id, sa.events.emit('changeDistinctId'))
    this.save()
  },
  identitiesSet: function (e) {
    const t = {}
    switch (e.type) {
      case 'login':
        ;(t.$identity_mp_id = this._state.identities.$identity_mp_id), (t[e.id_name] = e.id)
        break
      case 'logout':
        t.$identity_mp_id = this._state.identities.$identity_mp_id
    }
    this.set('identities', t)
  },
  change: function (e, t) {
    this._state['_' + e] = t
  },
  encryptStorage: function () {
    let e = this.getStorage()
    const t = 'data:enc;'
    isObject(e)
      ? (e = t + rot13obfs(JSON.stringify(e)))
      : isString(e) && e.indexOf(t) === -1 && (e = t + rot13obfs(e)),
      sa._.setStorageSync(saPara.storage_store_key, e)
  },
  save: function () {
    let e = deepCopy(this._state)
    const t = rot13obfs(JSON.stringify(e.identities))
    if (((e.identities = t), delete e._first_id, delete e._distinct_id, saPara.encrypt_storage)) {
      e = 'data:enc;' + rot13obfs(JSON.stringify(e))
    }
    sa._.setStorageSync(saPara.storage_store_key, e)
  },
  init: function () {
    let e = this.getStorage()
    const t = store.getUUID()
    if (e)
      isString(e) &&
        e.indexOf('data:enc;') !== -1 &&
        ((e = e.substring('data:enc;'.length)), (e = JSON.parse(rot13defs(e)))),
        this.toState(e)
    else {
      meta.is_first_launch = !0
      const a = new Date()
      const i = a.getTime()
      a.setHours(23),
        a.setMinutes(59),
        a.setSeconds(60),
        this.set({
          distinct_id: t,
          first_visit_time: i,
          first_visit_day_time: a.getTime(),
          identities: { $identity_mp_id: t },
          history_login_id: { name: '', value: '' },
        })
    }
    this.checkStoreInit()
  },
  checkStoreInit: function () {
    meta.init_status &&
      (this.store_queue.length > 0 &&
        each(this.store_queue, function (e) {
          sa[e.method].apply(sa, slice.call(e.params))
        }),
      (this.store_queue = []))
  },
}
function _decodeURIComponent(e) {
  let t = ''
  try {
    t = decodeURIComponent(e)
  } catch (a) {
    t = e
  }
  return t
}
const hasOwnProperty$2 = Object.prototype.hasOwnProperty
const decodeURIComponent$1 = _decodeURIComponent
function initAppGlobalName() {
  const e = App
  App = function (t) {
    ;(t[saPara.name] = sa), e.apply(this, arguments)
  }
}
function getPublicPresetProperties() {
  const e = getRefPage()
  const t = getCurrentPageInfo()
  const a = { $referrer: e.route, $referrer_title: e.title, $title: t.title, $url: t.url }
  return !0 === saPara.preset_properties.url_path && (a.$url_path = t.path), a
}
function encodeDates(e) {
  return (
    each(e, function (t, a) {
      isDate(t) ? (e[a] = formatDate(t)) : isObject(t) && (e[a] = encodeDates(t))
    }),
    e
  )
}
function formatDate(e) {
  function t(e) {
    return e < 10 ? '0' + e : e
  }
  return (
    e.getFullYear() +
    '-' +
    t(e.getMonth() + 1) +
    '-' +
    t(e.getDate()) +
    ' ' +
    t(e.getHours()) +
    ':' +
    t(e.getMinutes()) +
    ':' +
    t(e.getSeconds()) +
    '.' +
    t(e.getMilliseconds())
  )
}
function searchObjDate(e) {
  ;(isObject(e) || isArray(e)) &&
    each(e, function (t, a) {
      isObject(t) || isArray(t) ? searchObjDate(e[a]) : isDate(t) && (e[a] = formatDate(t))
    })
}
function formatString(e) {
  return e.length > saPara.max_string_length
    ? (log(
        '\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--' +
          e,
      ),
      e.slice(0, saPara.max_string_length))
    : e
}
function searchObjString(e) {
  isObject(e) &&
    each(e, function (t, a) {
      isObject(t) ? searchObjString(e[a]) : isString(t) && (e[a] = formatString(t))
    })
}
function parseSuperProperties(e) {
  isObject(e) &&
    each(e, function (t, a) {
      if (isFunction(t))
        try {
          ;(e[a] = t()),
            isFunction(e[a]) &&
              (log(
                '\u60a8\u7684\u5c5e\u6027- ' +
                  a +
                  ' \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664',
              ),
              delete e[a])
        } catch (t) {
          delete e[a],
            log(
              '\u60a8\u7684\u5c5e\u6027- ' +
                a +
                ' \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664',
            )
        }
    })
}
function unique(e) {
  for (var t, a = [], i = {}, r = 0; r < e.length; r++) (t = e[r]) in i || ((i[t] = !0), a.push(t))
  return a
}
const check = {
  checkKeyword: function (e) {
    return /^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(
      e,
    )
  },
  checkIdLength: function (e) {
    return (
      !(String(e).length > 255) ||
      (log('id \u957f\u5ea6\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\uff01'), !1)
    )
  },
}
function strip_sa_properties(e) {
  return isObject(e)
    ? (each(e, function (t, a) {
        if (isArray(t)) {
          const i = []
          each(t, function (e) {
            if (isString(e)) i.push(e)
            else if (isUndefined(e)) i.push('null')
            else
              try {
                i.push(JSON.stringify(e))
              } catch (e) {
                log(
                  '\u60a8\u7684\u6570\u636e - ' +
                    a +
                    ':' +
                    t +
                    ' - \u7684\u6570\u7ec4\u91cc\u7684\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664',
                )
              }
          }),
            (e[a] = i)
        }
        if (isObject(t))
          try {
            e[a] = JSON.stringify(t)
          } catch (i) {
            delete e[a],
              log(
                '\u60a8\u7684\u6570\u636e - ' +
                  a +
                  ':' +
                  t +
                  ' - \u7684\u6570\u636e\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664',
              )
          }
        else
          isString(t) ||
            isNumber(t) ||
            isDate(t) ||
            isBoolean(t) ||
            isArray(t) ||
            (log(
              '\u60a8\u7684\u6570\u636e - ' +
                a +
                ':' +
                t +
                ' - \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u5df2\u7ecf\u5c06\u5176\u5220\u9664',
            ),
            delete e[a])
      }),
      e)
    : e
}
function strip_empty_properties(e) {
  const t = {}
  return (
    each(e, function (e, a) {
      ;(e == null && void 0 === e) || (t[a] = e)
    }),
    t
  )
}
function utf8Encode(e) {
  let t
  let a
  let i
  let r
  let n = ''
  for (
    t = a = 0, i = (e = (e + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')).length, r = 0;
    r < i;
    r++
  ) {
    const s = e.charCodeAt(r)
    let o = null
    s < 128
      ? a++
      : (o =
          s > 127 && s < 2048
            ? String.fromCharCode((s >> 6) | 192, (63 & s) | 128)
            : String.fromCharCode((s >> 12) | 224, ((s >> 6) & 63) | 128, (63 & s) | 128)),
      o !== null && (a > t && (n += e.substring(t, a)), (n += o), (t = a = r + 1))
  }
  return a > t && (n += e.substring(t, e.length)), n
}
function base64Encode(e) {
  let t
  let a
  let i
  let r
  let n
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let o = 0
  let u = 0
  let c = ''
  const p = []
  if (!e) return e
  e = utf8Encode(e)
  do {
    ;(t =
      ((n = (e.charCodeAt(o++) << 16) | (e.charCodeAt(o++) << 8) | e.charCodeAt(o++)) >> 18) & 63),
      (a = (n >> 12) & 63),
      (i = (n >> 6) & 63),
      (r = 63 & n),
      (p[u++] = s.charAt(t) + s.charAt(a) + s.charAt(i) + s.charAt(r))
  } while (o < e.length)
  switch (((c = p.join('')), e.length % 3)) {
    case 1:
      c = c.slice(0, -2) + '=='
      break
    case 2:
      c = c.slice(0, -1) + '='
  }
  return c
}
function btoa(e) {
  for (
    var t,
      a,
      i,
      r,
      n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      s = '',
      o = 0,
      u = (e = String(e)).length % 3;
    o < e.length;

  )
    ((a = e.charCodeAt(o++)) > 255 ||
      (i = e.charCodeAt(o++)) > 255 ||
      (r = e.charCodeAt(o++)) > 255) &&
      log(
        "Failed to execute 'btoa' : The string to be encoded contains characters outside of the Latin1 range.",
      ),
      (s +=
        n.charAt(((t = (a << 16) | (i << 8) | r) >> 18) & 63) +
        n.charAt((t >> 12) & 63) +
        n.charAt((t >> 6) & 63) +
        n.charAt(63 & t))
  return u ? s.slice(0, u - 3) + '==='.substring(u) : s
}
function urlBase64Encode(e) {
  return btoa(
    encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
      return String.fromCharCode('0x' + t)
    }),
  )
}
function getCurrentPage() {
  let e = {}
  try {
    const t = getCurrentPages()
    e = t[t.length - 1]
  } catch (e) {
    log(e)
  }
  return e
}
function getCurrentPath() {
  let e = '\u672a\u53d6\u5230'
  try {
    const t = getCurrentPage()
    e = t ? t.route : e
  } catch (e) {
    log(e)
  }
  return e
}
function getIsFirstDay() {
  return !!(
    typeof store._state === 'object' &&
    isNumber(store._state.first_visit_day_time) &&
    store._state.first_visit_day_time > new Date().getTime()
  )
}
function getCurrentUrl(e) {
  const t = getCurrentPath()
  let a = ''
  return (
    isObject(e) && e.sensors_mp_encode_url_query && (a = e.sensors_mp_encode_url_query),
    t ? (a ? t + '?' + a : t) : '\u672a\u53d6\u5230'
  )
}
function getPath(e) {
  return (e = isString(e) ? e.replace(/^\//, '') : '\u53d6\u503c\u5f02\u5e38')
}
function getCustomUtmFromQuery(e, t, a, i) {
  if (!isObject(e)) return {}
  const r = {}
  if (e.sa_utm)
    for (const n in e)
      n !== 'sa_utm' ? include(saPara.source_channel, n) && (r[a + n] = e[n]) : (r[i + n] = e[n])
  else
    for (const s in e)
      (' ' + SOURCE_CHANNEL_STANDARD + ' ').indexOf(' ' + s + ' ') === -1
        ? include(saPara.source_channel, s) && (r[a + s] = e[s])
        : (r[t + s] = e[s])
  return r
}
function getObjFromQuery(e) {
  const t = e.split('?')
  let a = []
  const i = {}
  return t && t[1]
    ? (each(t[1].split('&'), function (e) {
        ;(a = e.split('='))[0] && a[1] && (i[a[0]] = a[1])
      }),
      i)
    : {}
}
function setStorageSync(e, t) {
  const a = function () {
    wx.setStorageSync(e, t)
  }
  try {
    a()
  } catch (e) {
    log('set Storage fail --', e)
    try {
      a()
    } catch (e) {
      log('set Storage fail again --', e)
    }
  }
}
function getStorageSync(e) {
  let t = ''
  try {
    t = wx.getStorageSync(e)
  } catch (e) {
    log('getStorage fail')
  }
  return t
}
function getMPScene(e) {
  return isNumber(e) || (isString(e) && e !== '')
    ? (e = 'wx-' + String(e))
    : '\u672a\u53d6\u5230\u503c'
}
function objToParam(e, t) {
  if (!isObject(e)) return log('\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61'), ''
  const a = []
  for (const i in e)
    if (hasOwnProperty$2.call(e, i)) {
      let r = e[i]
      void 0 === r ? a.push(i + '=') : ((r = t ? encodeURIComponent(r) : r), a.push(i + '=' + r))
    }
  return a.join('&')
}
function delObjectKey(e) {
  if (isObject(e)) for (let t = 0; t < SHARE_INFO_KEY.length; t++) delete e[SHARE_INFO_KEY[t]]
  else log('\u8bf7\u4f20\u5165\u6709\u6548\u5bf9\u8c61')
}
function shareInfoData(e) {
  let t = {}
  let a = {}
  if (saPara.preset_events.share_info_use_string) {
    a = e.query
    for (let i = 0; i < SHARE_INFO_KEY.length; i++) {
      if (!hasOwnProperty$2.call(a, SHARE_INFO_KEY[i])) return {}
      a[SHARE_INFO_KEY[i]] = _decodeURIComponent(a[SHARE_INFO_KEY[i]])
    }
    t = {
      depth: Number(a.sensors_share_d),
      path: a.sensors_share_p || '',
      id: a.sensors_share_i || '',
      method: a.sensors_share_m || '',
    }
  } else {
    if (!e.query.sampshare) return {}
    if (!isJSONString((a = _decodeURIComponent(e.query.sampshare)))) return {}
    t = { depth: (a = JSON.parse(a)).d, path: a.p, id: a.i, method: a.m }
  }
  return t
}
function setShareInfo(e, t) {
  let a = {}
  const i = {}
  const r = store.getDistinctId()
  const n = store.getFirstId()
  if (e && isObject(e.query)) {
    if (isEmptyObject((a = shareInfoData(e)))) return {}
    var s = a.depth
    var o = a.path
    var u = a.id
    var c = a.method
  }
  typeof u === 'string'
    ? ((t.$share_distinct_id = u), (meta.share_distinct_id = u), (i.$latest_share_distinct_id = u))
    : (t.$share_distinct_id = '\u53d6\u503c\u5f02\u5e38'),
    typeof s === 'number'
      ? !meta.share_distinct_id || (meta.share_distinct_id !== r && meta.share_distinct_id !== n)
        ? !meta.share_distinct_id || (meta.share_distinct_id === r && meta.share_distinct_id === n)
          ? (t.$share_depth = '-1')
          : ((t.$share_depth = s + 1),
            (meta.query_share_depth = s + 1),
            (i.$latest_share_depth = s + 1))
        : ((t.$share_depth = s), (meta.query_share_depth = s), (i.$latest_share_depth = s))
      : (t.$share_depth = '-1'),
    typeof o === 'string'
      ? ((t.$share_url_path = o), (i.$latest_share_url_path = o))
      : (t.$share_url_path = '\u53d6\u503c\u5f02\u5e38'),
    typeof c === 'string'
      ? ((t.$share_method = c), (i.$latest_share_method = c))
      : (t.$share_method = '\u53d6\u503c\u5f02\u5e38'),
    setLatestShare(i)
}
function getShareInfo() {
  if (saPara.preset_events.share_info_use_string)
    return objToParam(
      {
        sensors_share_i: store.getDistinctId() || '\u53d6\u503c\u5f02\u5e38',
        sensors_share_p: getCurrentPath(),
        sensors_share_d: meta.query_share_depth,
        sensors_share_m: meta.share_method,
      },
      !0,
    )
  const e = JSON.stringify({
    i: store.getDistinctId() || '\u53d6\u503c\u5f02\u5e38',
    p: getCurrentPath(),
    d: meta.query_share_depth,
    m: meta.share_method,
  })
  return 'sampshare=' + encodeURIComponent(e)
}
function detectOptionQuery(e) {
  if (!e || !isObject(e.query)) return {}
  let t
  let a
  let i
  let r
  const n = {}
  return (
    (n.query = extend({}, e.query)),
    typeof n.query.scene === 'string' &&
      ((t = n.query),
      (a = ['utm_source', 'utm_content', 'utm_medium', 'utm_campaign', 'utm_term', 'sa_utm'].concat(
        saPara.source_channel,
      )),
      (i = new RegExp('(' + a.join('|') + ')%3D', 'i')),
      (r = Object.keys(t)).length === 1 && r[0] === 'scene' && i.test(t.scene)) &&
      ((n.scene = n.query.scene), delete n.query.scene),
    e.query.q &&
      e.query.scancode_time &&
      String(e.scene).slice(0, 3) === '101' &&
      ((n.q = String(n.query.q)), delete n.query.q, delete n.query.scancode_time),
    n
  )
}
function getMixedQuery(e) {
  const t = detectOptionQuery(e)
  let a = t.scene
  const i = t.q
  const r = t.query
  for (const n in r) r[n] = _decodeURIComponent(r[n])
  return (
    a &&
      extend(
        r,
        getObjFromQuery(
          (a =
            (a = _decodeURIComponent(a)).indexOf('?') !== -1
              ? '?' + a.replace(/\?/g, '')
              : '?' + a),
        ),
      ),
    i && extend(r, getObjFromQuery(_decodeURIComponent(i))),
    r
  )
}
function setUtm(e, t) {
  const a = {}
  const i = getMixedQuery(e)
  const r = getCustomUtmFromQuery(i, '$', '_', '$')
  const n = getCustomUtmFromQuery(i, '$latest_', '_latest_', '$latest_')
  return (a.pre1 = r), (a.pre2 = n), extend(t, r), a
}
function setSfSource(e, t) {
  isEmptyObject(e.query) ||
    (e.query &&
      e.query._sfs &&
      ((t.$sf_source = e.query._sfs), sa.registerApp({ $latest_sf_source: t.$sf_source })))
}
function setPageSfSource(e) {
  try {
    const t = getCurrentPage()
    const a = deepCopy(t ? t.options : '')
    for (const i in a) a[i] = _decodeURIComponent(a[i])
    !isEmptyObject(a) && a._sfs && (e.$sf_source = a._sfs)
  } catch (e) {
    log(e)
  }
}
function setRefPage() {
  const e = { route: '\u76f4\u63a5\u6253\u5f00', path: '\u76f4\u63a5\u6253\u5f00', title: '' }
  try {
    const t = getCurrentPage()
    if (t && t.route) {
      const a = t.sensors_mp_url_query ? '?' + t.sensors_mp_url_query : ''
      const i = t.route
      const r = getPageTitle(i)
      ;(e.route = i + a),
        (e.path = i),
        (e.title = r),
        meta.page_route_map.length >= 2
          ? (meta.page_route_map.shift(), meta.page_route_map.push(e))
          : meta.page_route_map.push(e)
    }
  } catch (e) {
    log(e)
  }
}
function getRefPage() {
  const e = { route: '\u76f4\u63a5\u6253\u5f00', path: '\u76f4\u63a5\u6253\u5f00', title: '' }
  return (
    meta.page_route_map.length > 1 &&
      ((e.title = meta.page_route_map[0].title),
      (e.route = meta.page_route_map[0].route),
      (e.path = meta.page_route_map[0].path)),
    e
  )
}
function getCurrentPageInfo() {
  const e = getCurrentPage()
  const t = { title: '', url: '', path: '\u672a\u53d6\u5230' }
  if (e && e.route) {
    const a = e.sensors_mp_url_query ? '?' + e.sensors_mp_url_query : ''
    ;(t.title = getPageTitle(e.route)), (t.url = e.route + a), (t.path = e.route)
  }
  return t
}
function setPageRefData(e, t, a) {
  const i = getRefPage()
  isObject(e) &&
    (t
      ? meta.page_route_map.length > 0 && t
        ? ((a = a ? '?' + a : ''),
          (e.$referrer = getPath(t) + a),
          (e.$referrer_title = getPageTitle(t)))
        : ((e.$referrer = '\u76f4\u63a5\u6253\u5f00'), (e.$referrer_title = ''))
      : ((e.$referrer = i.route), (e.$referrer_title = i.title)))
}
function getPageTitle(e) {
  if (e === '\u672a\u53d6\u5230' || !e) return ''
  let t = ''
  try {
    if (__wxConfig) {
      const a = __wxConfig
      const i = __wxConfig.page || {}
      const r = i[e] || i[e + '.html']
      const n = {}
      const s = {}
      if (
        (a.global &&
          a.global.window &&
          a.global.window.navigationBarTitleText &&
          (n.titleVal = a.global.window.navigationBarTitleText),
        r &&
          r.window &&
          r.window.navigationBarTitleText &&
          (s.titleVal = r.window.navigationBarTitleText),
        !s.titleVal && __wxAppCode__)
      ) {
        const o = __wxAppCode__[e + '.json']
        o && o.navigationBarTitleText && (s.titleVal = o.navigationBarTitleText)
      }
      if (
        (each(meta.global_title, function (a, i) {
          if (i === e) return (t = a)
        }),
        t.length === 0)
      ) {
        const u = extend(n, s)
        t = u.titleVal || ''
      }
    }
  } catch (e) {
    log(e)
  }
  return t
}
function wxrequest(e) {
  if (compareSDKVersion(meta.wx_sdk_version, '2.10.0') >= 0)
    (e.timeout = saPara.datasend_timeout), wx.request(e)
  else {
    const t = wx.request(e)
    setTimeout(function () {
      isObject(t) && isFunction(t.abort) && t.abort()
    }, saPara.datasend_timeout)
  }
}
function validId(e) {
  return (typeof e !== 'string' && typeof e !== 'number') || e === ''
    ? (log('\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef'), !1)
    : typeof e !== 'number' || ((e = String(e)), /^\d+$/.test(e))
      ? !!check.checkIdLength(e) && e
      : (log('\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef'), !1)
}
function compareSDKVersion(e, t) {
  ;(e = e.split('.')), (t = t.split('.'))
  for (var a = Math.max(e.length, t.length); e.length < a; ) e.push('0')
  for (; t.length < a; ) t.push('0')
  for (let i = 0; i < a; i++) {
    const r = parseInt(e[i])
    const n = parseInt(t[i])
    if (r > n) return 1
    if (r < n) return -1
  }
  return 0
}
function setUpperCase(e) {
  return isString(e) ? e.toLocaleUpperCase() : e
}
function setLatestChannel(e) {
  isEmptyObject(e) ||
    ((function (e, t) {
      let a = !1
      for (const i in t) e[t[i]] && (a = !0)
      return a
    })(e, LATEST_SOURCE_CHANNEL) &&
      (sa.clearAppRegister(LATEST_SOURCE_CHANNEL), sa.clearAllProps(LATEST_SOURCE_CHANNEL)),
    saPara.is_persistent_save.utm ? sa.register(e) : sa.registerApp(e))
}
function setLatestShare(e) {
  ;(e.$latest_share_depth ||
    e.$latest_share_distinct_id ||
    e.$latest_share_url_path ||
    e.$latest_share_method) &&
    (sa.clearAppRegister(LATEST_SHARE_INFO),
    sa.clearAllProps(LATEST_SHARE_INFO),
    saPara.is_persistent_save.share ? sa.register(e) : sa.registerApp(e))
}
function setQuery(e, t) {
  if (e && isObject(e) && !isEmptyObject(e)) {
    const a = []
    return (
      each(e, function (e, i) {
        ;(i === 'q' && isString(e) && e.indexOf('http') === 0) ||
          (t ? a.push(i + '=' + e) : a.push(i + '=' + _decodeURIComponent(e)))
      }),
      a.join('&')
    )
  }
  return ''
}
function setNavigationBarTitle() {
  try {
    const e = wx.setNavigationBarTitle
    Object.defineProperty(wx, 'setNavigationBarTitle', {
      get: function () {
        return function (t) {
          const a = getCurrentPath()
          ;(t = isObject(t) ? t : {}), (meta.global_title[a] = t.title), e.call(this, t)
        }
      },
    })
  } catch (e) {
    log(e)
  }
}
function getUtmFromPage() {
  let e = {}
  try {
    const t = deepCopy(getCurrentPage().options)
    for (const a in t) t[a] = _decodeURIComponent(t[a])
    e = getCustomUtmFromQuery(t, '$', '_', '$')
  } catch (e) {
    log(e)
  }
  return e
}
function isNewLoginId(e, t) {
  return e !== store._state.history_login_id.name || store._state.history_login_id.value !== t
}
function isSameAndAnonymousID(e) {
  const t = store.getFirstId()
  const a = store.getDistinctId()
  return t ? e === t : e === a
}
function isPresetIdKeys(e, t) {
  let a = ['$identity_anonymous_id']
  for (const i of (isArray(t) && (a = a.concat(t)), a)) if (i === e) return !0
  return !1
}
function encodeTrackData(e) {
  const t = base64Encode((e = JSON.stringify(e)))
  return encodeURIComponent(t)
}
function setPublicProperties(e) {
  if (e && e.properties) {
    const t = getRefPage()
    const a = getCurrentPageInfo()
    const i = { $referrer: t.route, $referrer_title: t.title, $title: a.title, $url: a.url }
    for (const r in (!0 === saPara.preset_properties.url_path && (i.$url_path = a.path), i))
      hasOwnProperty$2.call(e.properties, r) || (e.properties[r] = i[r])
  }
}
function networkStatusChange() {
  wx.onNetworkStatusChange(function (e) {
    sa.registerApp({ $network_type: e.networkType || '' })
  })
}
function getNetworkType() {
  return new Promise((e, t) => {
    wx.getNetworkType({
      success: function (t) {
        ;(meta.preset_properties.$network_type = setUpperCase(t.networkType)), e()
      },
      fail: function (e) {
        log('\u83b7\u53d6\u7f51\u7edc\u4fe1\u606f\u5931\u8d25', e), t()
      },
    })
  })
}
function getSystemInfo() {
  const e = meta.preset_properties
  return new Promise((t) => {
    wx.getSystemInfo({
      success: function (a) {
        let i, r
        ;(e.$brand = setUpperCase(a.brand)),
          (e.$manufacturer = a.brand),
          (e.$model = a.model),
          (e.$screen_width = Number(a.screenWidth)),
          (e.$screen_height = Number(a.screenHeight)),
          (e.$os =
            ((i = a.platform),
            (r = i.toLowerCase()) === 'ios' ? 'iOS' : r === 'android' ? 'Android' : i)),
          (e.$os_version = a.system.indexOf(' ') > -1 ? a.system.split(' ')[1] : a.system),
          (meta.wx_sdk_version = a.SDKVersion),
          (e.$mp_client_app_version = a.version),
          (e.$mp_client_basic_library_version = meta.wx_sdk_version)
        const n = new Date().getTimezoneOffset()
        const s = getAppInfoSync()
        isNumber(n) && (e.$timezone_offset = n),
          s.appId && (e.$app_id = s.appId),
          s.appVersion && (e.$app_version = s.appVersion),
          t()
      },
    })
  })
}
const info = { currentProps: meta.preset_properties }
const logger = {
  info: function () {
    if (saPara.show_log && typeof console === 'object' && console.log)
      try {
        if (arguments.length === 3) return console.log(arguments[0], arguments[1], arguments[2])
        if (arguments.length === 2) return console.log(arguments[0], arguments[1])
        if (arguments.length === 1) return console.log(arguments[0])
      } catch (e) {
        console.log(arguments[0])
      }
  },
}
function isValidListener(e) {
  return typeof e === 'function' || (!(!e || typeof e !== 'object') && isValidListener(e.listener))
}
class EventEmitterBase {
  constructor() {
    this._events = {}
  }

  on(e, t) {
    if (!e || !t) return !1
    if (!isValidListener(t)) throw new Error('listener must be a function')
    this._events[e] = this._events[e] || []
    const a = typeof t === 'object'
    return this._events[e].push(a ? t : { listener: t, once: !1 }), this
  }

  prepend(e, t) {
    if (!e || !t) return !1
    if (!isValidListener(t)) throw new Error('listener must be a function')
    this._events[e] = this._events[e] || []
    const a = typeof t === 'object'
    return this._events[e].unshift(a ? t : { listener: t, once: !1 }), this
  }

  prependOnce(e, t) {
    return this.prepend(e, { listener: t, once: !0 })
  }

  once(e, t) {
    return this.on(e, { listener: t, once: !0 })
  }

  off(e, t) {
    const a = this._events[e]
    if (!a) return !1
    if (typeof t === 'number') a.splice(t, 1)
    else if (typeof t === 'function')
      for (let i = 0, r = a.length; i < r; i++) a[i] && a[i].listener === t && a.splice(i, 1)
    return this
  }

  emit(e, t) {
    const a = this._events[e]
    if (!a) return !1
    for (let i = 0; i < a.length; i++) {
      const r = a[i]
      r && (r.listener.call(this, t || {}), r.once && this.off(e, i))
    }
    return this
  }

  removeAllListeners(e) {
    e && this._events[e] ? (this._events[e] = []) : (this._events = {})
  }

  listeners(e) {
    return e && typeof e === 'string' ? this._events[e] : this._events
  }
}
class EventEmitterEx extends EventEmitterBase {
  constructor() {
    super(), (this.cacheEvents = []), (this.maxLen = 20)
  }

  replay(e, t) {
    this.on(e, t),
      this.cacheEvents.length > 0 &&
        this.cacheEvents.forEach(function (a) {
          a.type === e && t.call(null, a.data)
        })
  }

  emit(e, t) {
    super.emit.apply(this, arguments),
      this.cacheEvents.push({ type: e, data: t }),
      this.cacheEvents.length > this.maxLen && this.cacheEvents.shift()
  }
}
const _ = Object.freeze({
  __proto__: null,
  decodeURIComponent: decodeURIComponent$1,
  encodeDates,
  formatDate,
  searchObjDate,
  formatString,
  searchObjString,
  parseSuperProperties,
  unique,
  check,
  getUtmFromPage,
  setQuery,
  setLatestShare,
  setLatestChannel,
  setUpperCase,
  compareSDKVersion,
  validId,
  wxrequest,
  getPageTitle,
  setPageRefData,
  getCurrentPageInfo,
  getRefPage,
  setRefPage,
  setPageSfSource,
  setSfSource,
  setUtm,
  getMixedQuery,
  detectOptionQuery,
  getShareInfo,
  setShareInfo,
  shareInfoData,
  delObjectKey,
  objToParam,
  getMPScene,
  getStorageSync,
  setStorageSync,
  getObjFromQuery,
  getCustomUtmFromQuery,
  getPath,
  getCurrentUrl,
  getIsFirstDay,
  getCurrentPath,
  getCurrentPage,
  urlBase64Encode,
  btoa,
  base64Encode,
  strip_empty_properties,
  strip_sa_properties,
  setNavigationBarTitle,
  networkStatusChange,
  getNetworkType,
  getSystemInfo,
  encodeTrackData,
  initAppGlobalName,
  getPublicPresetProperties,
  setPublicProperties,
  isPresetIdKeys,
  isNewLoginId,
  isSameAndAnonymousID,
  info,
  logger,
  getAppId,
  getAppInfoSync,
  getOpenidNameByAppid,
  rot13defs,
  rot13obfs,
  each,
  isObject,
  getRandom,
  extend,
  extend2Lev,
  coverExtend,
  isArray,
  isFunction,
  isArguments,
  toArray,
  values,
  include,
  trim,
  isEmptyObject,
  deepCopy,
  isUndefined,
  isString,
  isDate,
  isBoolean,
  isNumber,
  isJSONString,
  isInteger,
  isSafeInteger,
  slice,
  urlSafeBase64,
  EventEmitterBase,
  EventEmitterEx,
  log,
})
function onEventSend() {
  return {}
}
function processData(e) {
  return e
}
function batchTrackData(e) {
  const t = Date.now()
  return (
    e.forEach(function (e) {
      e._flush_time = t
    }),
    'data_list=' + encodeTrackData(e)
  )
}
var mergeStorageData = {
  getData: function (e) {
    wx.getStorage({
      key: saPara.storage_prepare_data_key,
      complete: function (t) {
        const a = t.data && isArray(t.data) ? t.data : []
        mergeStorageData.deleteAesData(a), e && e()
      },
    })
  },
  deleteAesData: function (e) {
    const t = []
    const a = e.length
    if (a > 0) {
      for (let i = 0; i < a; i++) isObject(e[i]) && t.push(e[i])
      store.mem.mdata = t.concat(store.mem.mdata)
    }
  },
}
function onceTrackData(e) {
  return 'data=' + encodeTrackData(e)
}
const kit = {}
function setKitTitle(e) {
  if (!isString(e)) return !1
  const t = meta.page_route_map.length - 1
  t >= 0 && (meta.page_route_map[t].title = e)
}
;(kit.setData = function (e) {
  if (!isObject(e)) return !1
  e.current_title && setKitTitle(e.current_title)
}),
  (kit.processData = processData),
  (kit.onceTrackData = onceTrackData),
  (kit.batchTrackData = batchTrackData),
  (kit.onEventSend = onEventSend)
var sendStrategy = {
  dataHasSend: !0,
  dataHasChange: !1,
  syncStorage: !1,
  failTime: 0,
  init: function () {
    ;(this.sendHasInit = !0),
      mergeStorageData.getData(sendStrategy.syncStorageState.bind(sendStrategy)),
      this.batchInterval(),
      this.onAppHide()
  },
  syncStorageState: function () {
    this.syncStorage = !0
  },
  onAppHide: function () {
    const e = this
    wx.onAppHide(function () {
      saPara.batch_send && e.batchSend()
    })
  },
  send: function (e) {
    ;(this.dataHasChange = !0),
      store.mem.getLength() >= 500 && (log('storage data is too large'), store.mem.mdata.shift()),
      (e = kit.processData(e)) && store.mem.add(e),
      this.sendAsOver()
  },
  sendAsOver: function () {
    this.sendHasInit && store.mem.getLength() >= saPara.batch_send.max_length && this.batchSend()
  },
  wxrequest: function (e) {
    if (isArray(e.data) && e.data.length > 0) {
      const t = kit.batchTrackData(e.data)
      sa._.wxrequest({
        url: saPara.server_url,
        method: 'POST',
        dataType: 'text',
        data: t,
        header: { 'content-type': 'text/plain' },
        success: function () {
          e.success(e.len)
        },
        fail: function () {
          e.fail()
        },
      })
    } else e.success(e.len)
  },
  batchSend: function () {
    if (this.dataHasSend) {
      let e
      let t
      const a = store.mem.mdata
      ;(t = (e = a.length >= 100 ? a.slice(0, 100) : a).length) > 0 &&
        ((this.dataHasSend = !1),
        this.wxrequest({
          data: e,
          len: t,
          success: this.batchRemove.bind(this),
          fail: this.sendFail.bind(this),
        }))
    }
  },
  sendFail: function () {
    ;(this.dataHasSend = !0), this.failTime++
  },
  batchRemove: function (e) {
    store.mem.clear(e),
      (this.dataHasSend = !0),
      (this.dataHasChange = !0),
      this.batchWrite(),
      (this.failTime = 0)
  },
  is_first_batch_write: !0,
  batchWrite: function () {
    this.dataHasChange &&
      ((this.dataHasChange = !1),
      this.syncStorage && sa._.setStorageSync(saPara.storage_prepare_data_key, store.mem.mdata))
  },
  batchInterval: function () {
    const e = this
    !(function t() {
      setTimeout(function () {
        e.batchWrite(), t()
      }, 500)
    })(),
      (function t() {
        setTimeout(
          function () {
            e.batchSend(), t()
          },
          saPara.batch_send.send_timeout * Math.pow(2, e.failTime),
        )
      })()
  },
}
function onceSend(e) {
  e._flush_time = Date.now()
  const t = kit.onceTrackData(e)
  let a = saPara.server_url + '?' + t
  saPara.server_url.indexOf('?') !== -1 && (a = saPara.server_url + '&' + t),
    wxrequest({ url: a, method: 'GET' })
}
function buildData(e, t) {
  const a = {
    distinct_id: sa.store.getDistinctId(),
    identities: extend({}, sa.store._state.identities),
    lib: { $lib: LIB_NAME, $lib_method: 'code', $lib_version: LIB_VERSION },
    properties: {},
  }
  return (
    e.type === 'track_id_unbind' &&
      e.event === '$UnbindID' &&
      ((a.identities = deepCopy(e.unbind_value)), delete e.unbind_value),
    isObject(t) || (t = {}),
    extend(a, sa.store.getUnionId(), e),
    isObject(e.properties) && !isEmptyObject(e.properties) && extend(a.properties, e.properties),
    (e.type && e.type.slice(0, 7) === 'profile') ||
      ((a._track_id = Number(
        String(getRandom()).slice(2, 5) +
          String(getRandom()).slice(2, 4) +
          String(Date.now()).slice(-4),
      )),
      (a.properties = extend(
        {},
        getPublicPresetProperties(),
        meta.preset_properties,
        sa.store.getProps(),
        t,
        a.properties,
      )),
      e.type === 'track' && (a.properties.$is_first_day = getIsFirstDay())),
    a.properties.$time && isDate(a.properties.$time)
      ? ((a.time = 1 * a.properties.$time), delete a.properties.$time)
      : (a.time = 1 * new Date()),
    sa.ee.sdk.emit('createData', a),
    sa.ee.sdk.emit('beforeBuildCheck', a),
    sa.ee.data.emit('beforeBuildCheck', a),
    parseSuperProperties(a.properties),
    searchObjDate(a),
    strip_sa_properties(a.properties),
    searchObjString(a),
    sa.ee.data.emit('finalAdjustData', a),
    a
  )
}
function dataStage(e) {
  if (!saPara.server_url) return !1
  if (meta.current_scene && meta.current_scene === 1154 && !sa.para.preset_events.moments_page)
    return !1
  const t = sa._.deepCopy(e)
  const a = buildData(e, kit.onEventSend(t))
  a
    ? (log(a), sa.events.emit('send', a), sa.para.batch_send ? sendStrategy.send(a) : onceSend(a))
    : log('error: \u6570\u636e\u5f02\u5e38 ' + a)
}
sa.popupEmitter = {
  attached: function () {
    return !1
  },
}
const usePlugin = function (e, t) {
  if (!isObject(e) && !isFunction(e)) return log('plugin must be an object', e), !1
  if (
    (isFunction(e.init) || log('plugin maybe missing init method', e.plugin_name || e),
    isString(e.plugin_name) && e.plugin_name
      ? sa.modules[e.plugin_name]
        ? (e = sa.modules[e.plugin_name])
        : (sa.modules[e.plugin_name] = e)
      : log('plugin_name is not defined - ', e.plugin_name || e),
    isObject(e) && !0 === e.plugin_is_init)
  )
    return e
  if (
    (isObject(e) &&
      e.plugin_name &&
      ((isString(e.plugin_version) && e.plugin_version === LIB_VERSION) ||
        log(
          'warning!' +
            e.plugin_name +
            ' plugin version do not match SDK version \uff01\uff01\uff01',
        )),
    meta.init_status)
  )
    typeof e.init === 'function' &&
      (e.init(sa, t), (e.plugin_is_init = !0), log(e.plugin_name + ' plugin is initialized'))
  else {
    const a = { target: e, para: t }
    meta.plugin.uninitialized_list.push(a)
  }
  return e
}
const checkPluginInitStatus = function () {
  if (meta.plugin.uninitialized_list.length > 0) {
    for (const e in meta.plugin.uninitialized_list) {
      const t = meta.plugin.uninitialized_list[e]
      t &&
        t.target &&
        typeof t.target.init === 'function' &&
        !t.target.plugin_is_init &&
        (t.target.init(sa, t.para),
        isObject(t.target) &&
          ((t.target.plugin_is_init = !0),
          isString(t.target.plugin_name) &&
            t.target.plugin_name &&
            log(t.target.plugin_name + ' plugin is initialized')))
    }
    meta.plugin.uninitialized_list = []
  }
}
function initAppShowHide() {
  wx.onAppShow(function (e) {
    if (!meta.life_state.app_launched) {
      const t = wx.getLaunchOptionsSync() || {}
      sa.autoTrackCustom.appLaunch(t)
    }
    sa.autoTrackCustom.appShow(e)
  }),
    wx.onAppHide(function () {
      sa.autoTrackCustom.appHide()
    })
}
function checkAppLaunch() {
  if (!meta.life_state.app_launched) {
    const e = wx.getLaunchOptionsSync() || {}
    sa.autoTrackCustom.appLaunch(e)
  }
}
function mpProxy(e, t, a) {
  const i = sa.autoTrackCustom[a]
  if (e[t]) {
    const r = e[t]
    e[t] = function () {
      !sa.para.autoTrackIsFirst ||
      (isObject(sa.para.autoTrackIsFirst) && !sa.para.autoTrackIsFirst[a])
        ? (r.apply(this, arguments), i.apply(this, arguments))
        : (!0 === sa.para.autoTrackIsFirst ||
            (isObject(sa.para.autoTrackIsFirst) && sa.para.autoTrackIsFirst[a])) &&
          (i.apply(this, arguments), r.apply(this, arguments)),
        sa.ee.page.emit(a)
    }
  } else
    e[t] = function () {
      i.apply(this, arguments), sa.ee.page.emit(a)
    }
}
function clickTrack(e) {
  let t
  let a = {}
  let i = {}
  const r = e.currentTarget || {}
  const n = e.target || {}
  if (
    isObject(sa.para.framework) &&
    isObject(sa.para.framework.taro) &&
    !sa.para.framework.taro.createApp &&
    n.id &&
    r.id &&
    n.id !== r.id
  )
    return !1
  const s = r.dataset || {}
  if (
    ((t = e.type),
    (a.$element_id = r.id),
    (a.$element_type = s.type),
    (a.$element_content = s.content),
    (a.$element_name = s.name),
    isObject(e.event_prop) && (i = e.event_prop),
    t && isClick(t))
  ) {
    if (
      sa.para.preset_events &&
      sa.para.preset_events.collect_element &&
      !1 === sa.para.preset_events.collect_element(arguments[0])
    )
      return !1
    ;(a.$url_path = sa._.getCurrentPath()),
      sa._.setPageRefData(a),
      (a = sa._.extend(a, i)),
      sa.track('$MPClick', a)
  }
}
function clickProxy(e, t) {
  const a = e[t]
  e[t] = function () {
    const e = a.apply(this, arguments)
    const t = arguments[0]
    return (
      isObject(t) &&
        (sa.para.preset_events.defer_track
          ? setTimeout(function () {
              clickTrack(t)
            }, 0)
          : clickTrack(t)),
      e
    )
  }
}
function isClick(e) {
  return !!{ tap: 1, longpress: 1, longtap: 1 }[e]
}
function tabProxy(e) {
  const t = e.onTabItemTap
  e.onTabItemTap = function (e) {
    t && t.apply(this, arguments)
    const a = {}
    e && (a.$element_content = e.text),
      (a.$element_type = 'tabBar'),
      (a.$url_path = sa._.getCurrentPath()),
      sa._.setPageRefData(a),
      sa.track('$MPClick', a)
  }
}
function getMethods(e) {
  const t = MP_FILTER_HOOK
  const a = []
  for (const i in e) typeof e[i] !== 'function' || t[i] || a.push(i)
  return a
}
function initPageProxy() {
  const e = Page
  Page = function (t) {
    try {
      t || (t = {}), monitorClick(t), monitorHooks(t), e.apply(this, arguments)
    } catch (t) {
      e.apply(this, arguments)
    }
  }
  const t = Component
  Component = function (e) {
    try {
      e || (e = {}),
        e.methods || (e.methods = {}),
        monitorClick(e.methods),
        monitorHooks(e.methods),
        t.apply(this, arguments)
    } catch (e) {
      t.apply(this, arguments)
    }
  }
}
function monitorClick(e) {
  let t = []
  if (sa.para.autoTrack && sa.para.autoTrack.mpClick) {
    ;(t = getMethods(e)), tabProxy(e)
    for (let a = t.length, i = 0; i < a; i++) clickProxy(e, t[i])
  }
}
function monitorHooks(e) {
  mpProxy(e, 'onLoad', 'pageLoad'),
    mpProxy(e, 'onShow', 'pageShow'),
    mpProxy(e, 'onHide', 'pageHide'),
    mpProxy(e, 'onUnload', 'pageHide'),
    mpProxy(e, 'onAddToFavorites', 'pageAddFavorites'),
    typeof e.onShareAppMessage === 'function' && sa.autoTrackCustom.pageShare(e),
    typeof e.onShareTimeline === 'function' && sa.autoTrackCustom.pageShareTimeline(e)
}
const eventEmitter = function () {
  this.sub = []
}
eventEmitter.prototype = {
  add: function (e) {
    this.sub.push(e)
  },
  emit: function (e, t) {
    this.sub.forEach(function (a) {
      a.on(e, t)
    })
  },
}
const eventSub = function (e) {
  sa.events.add(this), (this._events = []), (this.handle = e), (this.ready = !1)
}
eventSub.prototype = {
  on: function (e, t) {
    if (this.ready) {
      if (isFunction(this.handle))
        try {
          this.handle(e, t)
        } catch (e) {
          log(e)
        }
    } else this._events.push({ event: e, data: t })
  },
  isReady: function () {
    const e = this
    ;(e.ready = !0),
      e._events.forEach(function (t) {
        if (isFunction(e.handle))
          try {
            e.handle(t.event, t.data)
          } catch (e) {
            log(e)
          }
      })
  },
}
const ee = {}
function checkPrivacyStatus() {
  let e
  return (
    global &&
      global.sensors_data_pre_config &&
      (e =
        !!global.sensors_data_pre_config.is_compliance_enabled &&
        global.sensors_data_pre_config.is_compliance_enabled),
    !e || !!meta.init_status || !!meta.privacy.enable_data_collect
  )
}
function enableDataCollect() {
  meta.privacy.enable_data_collect = !0
}
function apiStaging() {
  each(
    [
      'resetAnonymousIdentity',
      'setProfile',
      'setOnceProfile',
      'track',
      'quick',
      'incrementProfile',
      'appendProfile',
      'login',
      'logout',
      'registerApp',
      'register',
      'clearAllRegister',
      'clearAllProps',
      'clearAppRegister',
      'bind',
      'unbind',
      'unsetOpenid',
      'setUnionid',
      'unsetUnionid',
      'bindOpenid',
      'unbindOpenid',
      'bindUnionid',
      'unbindUnionid',
    ],
    function (e) {
      const t = sa[e]
      sa[e] = function () {
        return (
          !!checkPrivacyStatus() &&
          (!isFunction(sa.getDisabled) || !sa.getDisabled()) &&
          void (meta.initialState.isComplete
            ? t.apply(sa, arguments)
            : meta.initialState.queue.push([e, arguments]))
        )
      }
    },
  )
}
function registerApp(e) {
  isObject(e) && !isEmptyObject(e) && (meta.preset_properties = extend(meta.preset_properties, e))
}
function register(e) {
  isObject(e) && !isEmptyObject(e) && store.setProps(e)
}
function clearAllRegister() {
  store.setProps({}, !0)
}
function clearAppRegister(e) {
  isArray(e) &&
    each(meta.preset_properties, function (t, a) {
      include(e, a) && delete meta.preset_properties[a]
    })
}
function clearAllProps(e) {
  const t = store.getProps()
  const a = {}
  isArray(e) &&
    (each(t, function (t, i) {
      include(e, i) || (a[i] = t)
    }),
    store.setProps(a, !0))
}
;(ee.sdk = new EventEmitterEx()), (ee.data = new EventEmitterEx()), (ee.page = new EventEmitterEx())
const hasOwnProperty$3 = Object.prototype.hasOwnProperty
function setProfile(e, t) {
  dataStage({ type: 'profile_set', properties: e })
}
function setOnceProfile(e, t) {
  dataStage({ type: 'profile_set_once', properties: e })
}
function appendProfile(e, t) {
  if (!isObject(e)) return !1
  each(e, function (t, a) {
    isString(t)
      ? (e[a] = [t])
      : isArray(t)
        ? (e[a] = t)
        : (delete e[a],
          log(
            'appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4',
          ))
  }),
    dataStage({ type: 'profile_append', properties: e })
}
function incrementProfile(e, t) {
  if (!isObject(e)) return !1
  const a = e
  isString(e) && ((e = {})[a] = 1), dataStage({ type: 'profile_increment', properties: e })
}
function track(e, t, a) {
  dataStage({ type: 'track', event: e, properties: t })
}
function identify(e, t) {
  if (!checkPrivacyStatus()) return !1
  if (!meta.init_status)
    return store.store_queue.push({ method: 'identify', params: arguments }), !1
  if ((e = validId(e))) {
    const a = store.getFirstId()
    !0 === t
      ? a
        ? store.set('first_id', e)
        : store.set('distinct_id', e)
      : a
        ? store.change('first_id', e)
        : store.change('distinct_id', e)
  }
}
function resetAnonymousIdentity(e) {
  if (store.getFirstId())
    return log('resetAnonymousIdentity must be used in a logout state \uff01'), !1
  if ((typeof e === 'number' && (e = String(e)), void 0 === e)) {
    const t = store.getUUID()
    ;(store._state.identities.$identity_mp_id = t), store.set('distinct_id', t)
  } else validId(e) && ((store._state.identities.$identity_mp_id = e), store.set('distinct_id', e))
}
function trackSignup(e, t, a, i) {
  let r, n, s, o
  isObject(e) ? ((r = e.id), (n = e.event_name), (s = e.id_name)) : ((r = e), (n = t)),
    store.set('distinct_id', r),
    (o = s && s !== IDENTITY_KEY.LOGIN ? s + '+' + r : r),
    dataStage({
      original_id: store.getFirstId() || store.getDistinctId(),
      distinct_id: o,
      login_id: o,
      type: 'track_signup',
      event: n,
      properties: a,
    })
}
function login(e) {
  if (!(e = validId(e))) return !1
  if (isSameAndAnonymousID(e)) return !1
  const t = store.getFirstId()
  const a = store.getDistinctId()
  const i = IDENTITY_KEY.LOGIN
  isNewLoginId(i, e) &&
    ((store._state.identities[i] = e),
    store.set('history_login_id', { name: i, value: e }),
    t || store.set('first_id', a),
    sa.trackSignup({ id: e, event_name: '$SignUp' }),
    store.identitiesSet({ type: 'login', id: e, id_name: i }))
}
function loginWithKey(e, t) {
  if (!isString(e)) return log('Key must be String'), !1
  if (!check.checkKeyword(e) && e.length > 100) log('Key [' + e + '] is invalid')
  else if (!check.checkKeyword(e)) return log('Key [' + e + '] is invalid'), !1
  if (
    isPresetIdKeys(e, [
      '$mp_openid',
      '$identity_mp_openid',
      '$identity_mp_unionid',
      '$mp_unionid',
      '$mp_id',
      '$identity_mp_id',
    ])
  )
    return log('Key [' + e + '] is invalid'), !1
  if (!(t = validId(t))) return !1
  if (isSameAndAnonymousID(t)) return !1
  const a = store.getFirstId()
  const i = store.getDistinctId()
  isNewLoginId(e, t) &&
    ((store._state.identities[e] = t),
    store.set('history_login_id', { name: e, value: t }),
    a || store.set('first_id', i),
    sa.trackSignup({ id: t, event_name: '$SignUp', id_name: e }),
    store.identitiesSet({ type: 'login', id: t, id_name: e }))
}
function getAnonymousID() {
  if (!isEmptyObject(store._state))
    return (
      store._state._first_id ||
      store._state.first_id ||
      store._state._distinct_id ||
      store._state.distinct_id
    )
  log('\u8bf7\u5148\u521d\u59cb\u5316SDK')
}
function getIdentities() {
  return isEmptyObject(store._state)
    ? (log('\u8bf7\u5148\u521d\u59cb\u5316SDK'), null)
    : store._state.identities || null
}
function logout(e) {
  const t = store.getFirstId()
  store.identitiesSet({ type: 'logout' }),
    store.set('history_login_id', { name: '', value: '' }),
    t
      ? (store.set('first_id', ''),
        !0 === e ? store.set('distinct_id', store.getUUID()) : store.set('distinct_id', t))
      : log('\u6ca1\u6709first_id\uff0clogout\u5931\u8d25')
}
function getPresetProperties() {
  if (meta.preset_properties && meta.preset_properties.$lib) {
    const e = {}
    each(meta.preset_properties, function (t, a) {
      a.indexOf('$') === 0 && (e[a] = t)
    })
    const t = {
      $url_path: getCurrentPath(),
      $is_first_day: getIsFirstDay(),
      $is_first_time: meta.is_first_launch,
    }
    const a = extend(e, t, meta.preset_properties, store.getProps())
    return delete a.$lib, a
  }
  return {}
}
function setOpenid(e, t) {
  if (!(e = validId(e))) return !1
  if (!checkPrivacyStatus()) return !1
  if (!meta.init_status)
    return store.store_queue.push({ method: 'setOpenid', params: arguments }), !1
  log(
    '\u8be5\u65b9\u6cd5\u5df2\u4e0d\u5efa\u8bae\u4f7f\u7528\uff0c\u5982\u679c\u662f id2 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 identify \u4ee3\u66ff\uff0c\u5982\u679c\u662f id3 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 bindOpenid \u4ee3\u66ff',
  ),
    t &&
      log(
        '%c \u5f53\u524d\u7248\u672c setOpenid \u63a5\u53e3 \u5df2\u4e0d\u652f\u6301\u4f20\u5165\u7b2c\u4e8c\u4e2a\u53c2\u6570',
        'color:#F39C12;font-size: 14px;',
      ),
    store.set('openid', e),
    sa.identify(e, !0)
  const a = getOpenidNameByAppid()
  ;(store._state.identities[a] = e), store.save()
}
function unsetOpenid(e) {
  log(
    '\u8be5\u65b9\u6cd5\u5df2\u4e0d\u5efa\u8bae\u4f7f\u7528\uff0c\u5982\u679c\u662f id3 \u7528\u6237\uff0c\u8bf7\u4f7f\u7528 unbindOpenid \u4ee3\u66ff',
  )
  const t = validId(e)
  if (!t) return !1
  const a = store._state.openid
  a === t && store.set('openid', '')
  const i = getOpenidNameByAppid()
  if (hasOwnProperty$3.call(store._state.identities, i) && t === store._state.identities[i]) {
    delete store._state.identities[i]
    const r = store.getFirstId()
    const n = store.getDistinctId()
    const s = store._state && store._state.identities && store._state.identities.$identity_mp_id
    r && r === a && s && store.change('first_id', s),
      n && n === a && s && store.change('distinct_id', s),
      store.save()
  }
}
function bindOpenid(e) {
  if (!(e = validId(e))) return !1
  const t = getOpenidNameByAppid()
  this.bind(t, e)
}
function unbindOpenid(e) {
  if (!validId(e)) return !1
  const t = getOpenidNameByAppid()
  this.unbind(t, e)
}
function setUnionid(e) {
  const t = validId(e)
  t && bind('$identity_mp_unionid', t)
}
function unsetUnionid(e) {
  const t = validId(e)
  if (t) {
    if (
      hasOwnProperty$3.call(store._state.identities, '$identity_mp_unionid') &&
      t === store._state.identities.$identity_mp_unionid
    ) {
      const a = getOpenidNameByAppid()
      hasOwnProperty$3.call(store._state.identities, a) &&
        (delete store._state.identities[a], delete store._state.openid, store.save())
    }
    unbind('$identity_mp_unionid', t)
  }
}
function initWithOpenid(e, t) {
  ;(e = e || {}).appid && (saPara.appid = e.appid),
    sa.openid.getOpenid(function (a) {
      a && sa.setOpenid(a, e.isCoverLogin), t && isFunction(t) && t(a), sa.init(e)
    })
}
function bind(e, t) {
  if (isNumber(t)) {
    if (isInteger(t) && !1 === isSafeInteger(t)) return log('Value must be String'), !1
    t = String(t)
  }
  if (!isString(e)) return log('Key must be String'), !1
  const a = store.getHistoryLoginId()
  const i = a ? a.name : ''
  return !check.checkKeyword(e) ||
    isPresetIdKeys(e, [IDENTITY_KEY.LOGIN, i, '$mp_id', '$identity_mp_id'])
    ? (log('Key [' + e + '] is invalid'), !1)
    : t && t !== ''
      ? isString(t)
        ? !!check.checkIdLength(t) &&
          ((store._state.identities[e] = t),
          store.save(),
          void dataStage({ type: 'track_id_bind', event: '$BindID' }))
        : (log('Value must be String'), !1)
      : (log('Value is empty or null'), !1)
}
function unbind(e, t) {
  if (isNumber(t)) {
    if (isInteger(t) && !1 === isSafeInteger(t)) return log('Value must be String'), !1
    t = String(t)
  }
  if (!isString(e)) return log('Key must be String'), !1
  if (!sa._.check.checkKeyword(e) || isPresetIdKeys(e, [IDENTITY_KEY.LOGIN]))
    return log('Key [' + e + '] is invalid'), !1
  if (!t || t === '') return log('Value is empty or null'), !1
  if (!isString(t)) return log('Value must be String'), !1
  if (!sa._.check.checkIdLength(t)) return !1
  hasOwnProperty$3.call(store._state.identities, e) &&
    t === store._state.identities[e] &&
    (e !== '$mp_id' && e !== '$identity_mp_id' && delete store._state.identities[e], store.save())
  const a = store.getDistinctId()
  const i = store.getFirstId()
  a === e + '+' + t &&
    (store.set('first_id', ''),
    store.set('distinct_id', i),
    store.set('history_login_id', { name: '', value: '' }))
  const r = {}
  ;(r[e] = t), dataStage({ type: 'track_id_unbind', event: '$UnbindID', unbind_value: r })
}
function setWebViewUrl(e, t) {
  if (
    (log(
      'setWebViewUrl \u65b9\u6cd5\u5df2\u4ece 2022-9-23 \u5f00\u59cb\u5e9f\u5f03\uff0c\u8bf7\u5c3d\u5feb\u53bb\u9664\u8be5 API \u7684\u8c03\u7528\uff0c\u5e76\u4f7f\u7528 use \u63d2\u4ef6 \u4ee3\u66ff',
    ),
    !isString(e) || e === '')
  )
    return log('error:\u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f'), !1
  if (!/^http(s)?:\/\//.test(e))
    return log('warning: \u8bf7\u4f20\u5165\u6b63\u786e\u7684 URL \u683c\u5f0f'), !1
  const a = /([^?#]+)(\?[^#]*)?(#.*)?/.exec(e)
  if (!a) return !1
  let i
  const r = a[1] || ''
  const n = a[2] || ''
  const s = a[3] || ''
  let o = ''
  let u = store.getDistinctId() || ''
  const c = store.getFirstId() || ''
  urlSafeBase64 && urlSafeBase64.encode
    ? (u = u ? urlSafeBase64.trim(urlSafeBase64.encode(urlBase64Encode(u))) : '')
    : rot13obfs && (u = u ? rot13obfs(u) : ''),
    (u = encodeURIComponent(u))
  const p = c ? 'f' + u : 'd' + u
  t
    ? ((i = s.indexOf('_sasdk')),
      (o =
        s.indexOf('?') > -1
          ? i > -1
            ? r + n + '#' + s.substring(1, i) + '_sasdk=' + p
            : r + n + '#' + s.substring(1) + '&_sasdk=' + p
          : r + n + '#' + s.substring(1) + '?_sasdk=' + p))
    : ((i = n.indexOf('_sasdk')),
      (o = /^\?(\w)+/.test(n)
        ? i > -1
          ? r + n.replace(/(_sasdk=)([^&]*)/gi, '_sasdk=' + p) + s
          : r + '?' + n.substring(1) + '&_sasdk=' + p + s
        : r + '?' + n.substring(1) + '_sasdk=' + p + s))
  return o
}
function quick() {
  const e = arguments[0]
  const t = arguments[1]
  const a = arguments[2]
  let i = isObject(a) ? a : {}
  if (e === 'getAnonymousID') {
    if (!isEmptyObject(store._state))
      return (
        store._state._first_id ||
        store._state.first_id ||
        store._state._distinct_id ||
        store._state.distinct_id
      )
    log('\u8bf7\u5148\u521d\u59cb\u5316SDK')
  } else
    e === 'appLaunch' || e === 'appShow'
      ? t
        ? sa.autoTrackCustom[e](t, i)
        : log(
            'App\u7684launch\u548cshow\uff0c\u5728sensors.quick\u7b2c\u4e8c\u4e2a\u53c2\u6570\u5fc5\u987b\u4f20\u5165App\u7684options\u53c2\u6570',
          )
      : e === 'appHide' && ((i = isObject(t) ? t : {}), sa.autoTrackCustom[e](i))
}
function appLaunch(e, t) {
  let a = {}
  e && e.scene
    ? ((meta.current_scene = e.scene), (a.$scene = getMPScene(e.scene)))
    : (a.$scene = '\u672a\u53d6\u5230\u503c'),
    e &&
      e.scene &&
      e.scene === 1010 &&
      e.query &&
      (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)),
    e && e.path && ((a.$url_path = getPath(e.path)), (a.$title = getPageTitle(e.path))),
    setShareInfo(e, a)
  const i = setUtm(e, a)
  meta.is_first_launch
    ? ((a.$is_first_time = !0), isEmptyObject(i.pre1) || sa.setOnceProfile(i.pre1))
    : (a.$is_first_time = !1),
    setLatestChannel(i.pre2),
    setSfSource(e, a),
    sa.registerApp({ $latest_scene: a.$scene }),
    (a.$url_query = setQuery(e.query)),
    (a.$url = e.path + (a.$url_query ? '?' + a.$url_query : '')),
    setPageRefData(t),
    isObject(t) && (a = extend(a, t)),
    sa.track('$MPLaunch', a)
}
function appShow(e, t) {
  let a = {}
  ;(meta.mp_show_time = new Date().getTime()),
    e && e.scene
      ? ((meta.current_scene = e.scene), (a.$scene = getMPScene(e.scene)))
      : (a.$scene = '\u672a\u53d6\u5230\u503c'),
    e &&
      e.scene &&
      e.scene === 1010 &&
      e.query &&
      (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)),
    e && e.path && ((a.$url_path = getPath(e.path)), (a.$title = getPageTitle(e.path))),
    setShareInfo(e, a),
    setLatestChannel(setUtm(e, a).pre2),
    setSfSource(e, a),
    sa.registerApp({ $latest_scene: a.$scene }),
    (a.$url_query = setQuery(e.query)),
    e && e.path && (a.$url = e.path + (a.$url_query ? '?' + a.$url_query : '')),
    setPageRefData(a, e.path, a.$url_query),
    isObject(t) && (a = extend(a, t)),
    sa.track('$MPShow', a)
}
function appHide(e) {
  const t = new Date().getTime()
  let a = {}
  ;(a.$url_path = getCurrentPath()),
    meta.mp_show_time &&
      t - meta.mp_show_time > 0 &&
      (t - meta.mp_show_time) / 36e5 < 24 &&
      (a.event_duration = (t - meta.mp_show_time) / 1e3),
    setPageRefData(a),
    isObject(e) && (a = extend(a, e)),
    sa.track('$MPHide', a),
    sa.sendStrategy.onAppHide()
}
function pageShow(e) {
  let t = {}
  const a = getCurrentPath()
  const i = getPageTitle(a)
  const r = getCurrentPage()
  i && (t.$title = i),
    (t.$url_path = a),
    (t.$url_query = r.sensors_mp_url_query ? r.sensors_mp_url_query : ''),
    setPageSfSource((t = extend(t, getUtmFromPage()))),
    setPageRefData(t),
    isObject(e) && (t = extend(t, e)),
    sa.track('$MPViewScreen', t)
}
function setPara(e) {
  sa.para = extend2Lev(saPara, e)
  const t = []
  if (isArray(saPara.source_channel))
    for (let a = saPara.source_channel.length, i = 0; i < a; i++)
      ' utm_source utm_medium utm_campaign utm_content utm_term sa_utm '.indexOf(
        ' ' + saPara.source_channel[i] + ' ',
      ) === -1 && t.push(saPara.source_channel[i])
  ;(saPara.source_channel = t),
    isObject(saPara.register) && extend(meta.preset_properties, saPara.register),
    saPara.openid_url ||
      (saPara.openid_url = saPara.server_url.replace(/([^\\\/])\/(sa)(\.gif){0,1}/, '$1/mp_login')),
    typeof saPara.send_timeout !== 'number' && (saPara.send_timeout = 1e3)
  const r = { send_timeout: 6e3, max_length: 6 }
  ;(e && e.datasend_timeout) || (saPara.batch_send && (saPara.datasend_timeout = 1e4)),
    !0 === saPara.batch_send
      ? (saPara.batch_send = extend({}, r))
      : isObject(saPara.batch_send) && (saPara.batch_send = extend({}, r, saPara.batch_send))
  const n = { share: !1, utm: !1 }
  !0 === saPara.is_persistent_save
    ? ((saPara.is_persistent_save = extend({}, n)), (saPara.is_persistent_save.utm = !0))
    : isObject(saPara.is_persistent_save) &&
      (saPara.is_persistent_save = extend({}, n, saPara.is_persistent_save)),
    saPara.server_url
      ? ((saPara.preset_properties = isObject(saPara.preset_properties)
          ? saPara.preset_properties
          : {}),
        isObject(saPara.autotrack_exclude_page) ||
          (saPara.autotrack_exclude_page = { pageShow: [], pageLeave: [] }),
        isArray(saPara.autotrack_exclude_page.pageShow) ||
          (saPara.autotrack_exclude_page.pageShow = []),
        isArray(saPara.autotrack_exclude_page.pageLeave) ||
          (saPara.autotrack_exclude_page.pageLeave = []))
      : log(
          '\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0',
        )
}
function getServerUrl() {
  return saPara.server_url
}
const autoTrackCustom = {
  trackCustom: function (e, t, a) {
    const i = saPara.autoTrack[e]
    let r = ''
    saPara.autoTrack &&
      i &&
      (typeof i === 'function'
        ? isObject((r = i())) && extend(t, r)
        : isObject(i) && (extend(t, i), (saPara.autoTrack[e] = !0)),
      sa.track(a, t))
  },
  appLaunch: function (e, t) {
    if (!checkPrivacyStatus()) return !1
    if (!meta.initialState.isComplete)
      return (
        meta.initialState.queue.push(['appLaunch', arguments]),
        (meta.life_state.app_launched = !0),
        !1
      )
    meta.life_state.app_launched = !0
    let a = {}
    if (
      (e && e.scene
        ? ((meta.current_scene = e.scene), (a.$scene = getMPScene(e.scene)))
        : (a.$scene = '\u672a\u53d6\u5230\u503c'),
      e &&
        e.scene &&
        e.scene === 1010 &&
        e.query &&
        (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)),
      e &&
        e.path &&
        ((a.$url_path = getPath(e.path)),
        (a.$title = getPageTitle(e.path)),
        e.query && isObject(e.query)))
    ) {
      let i = setQuery(e.query)
      ;(i = i ? '?' + i : ''), (a.$url = a.$url_path + i)
    }
    setShareInfo(e, a)
    const r = setUtm(e, a)
    meta.is_first_launch
      ? ((a.$is_first_time = !0), isEmptyObject(r.pre1) || sa.setOnceProfile(r.pre1))
      : (a.$is_first_time = !1),
      setLatestChannel(r.pre2),
      setSfSource(e, a),
      sa.registerApp({ $latest_scene: a.$scene }),
      (a.$url_query = setQuery(e.query)),
      setPageRefData(a),
      t
        ? ((a = extend(a, t)), sa.track('$MPLaunch', a))
        : saPara.autoTrack &&
          saPara.autoTrack.appLaunch &&
          sa.autoTrackCustom.trackCustom('appLaunch', a, '$MPLaunch')
  },
  appShow: function (e, t) {
    let a = {}
    ;(meta.mp_show_time = new Date().getTime()),
      e && e.scene
        ? ((meta.current_scene = e.scene), (a.$scene = getMPScene(e.scene)))
        : (a.$scene = '\u672a\u53d6\u5230\u503c'),
      e &&
        e.scene &&
        e.scene === 1010 &&
        e.query &&
        (e.query.sampshare && delete e.query.sampshare, delObjectKey(e.query)),
      e && e.path && ((a.$url_path = getPath(e.path)), (a.$title = getPageTitle(e.path))),
      setShareInfo(e, a),
      setLatestChannel(setUtm(e, a).pre2),
      setSfSource(e, a),
      sa.registerApp({ $latest_scene: a.$scene }),
      (a.$url_query = setQuery(e.query)),
      setPageRefData(a, e.path, a.$url_query),
      e && e.path && (a.$url = e.path + (a.$url_query ? '?' + a.$url_query : '')),
      t
        ? ((a = extend(a, t)), sa.track('$MPShow', a))
        : saPara.autoTrack &&
          saPara.autoTrack.appShow &&
          sa.autoTrackCustom.trackCustom('appShow', a, '$MPShow')
  },
  appHide: function (e) {
    const t = new Date().getTime()
    let a = {}
    ;(a.$url_path = getCurrentPath()),
      meta.mp_show_time &&
        t - meta.mp_show_time > 0 &&
        (t - meta.mp_show_time) / 36e5 < 24 &&
        (a.event_duration = (t - meta.mp_show_time) / 1e3),
      setPageRefData(a),
      e
        ? ((a = extend(a, e)), sa.track('$MPHide', a))
        : saPara.autoTrack &&
          saPara.autoTrack.appHide &&
          sa.autoTrackCustom.trackCustom('appHide', a, '$MPHide')
  },
  pageLoad: function (e) {
    meta.current_scene &&
      meta.current_scene === 1010 &&
      e &&
      (e.sampshare && delete e.sampshare, delObjectKey(e)),
      e &&
        isObject(e) &&
        ((this.sensors_mp_url_query = setQuery(e)),
        (this.sensors_mp_encode_url_query = setQuery(e, !0)))
  },
  pageShow: function () {
    meta.page_show_time = Date.now()
    let e = {}
    const t = getCurrentPath()
    const a = getPageTitle(t)
    setRefPage(),
      (e.$url_path = t),
      (e.$url_query = this.sensors_mp_url_query ? this.sensors_mp_url_query : ''),
      setPageRefData((e = extend(e, getUtmFromPage()))),
      setPageSfSource(e),
      a && (e.$title = a),
      saPara.onshow
        ? saPara.onshow(sa, t, this)
        : saPara.autotrack_exclude_page.pageShow.indexOf(t) === -1 &&
          sa.autoTrackCustom.trackCustom('pageShow', e, '$MPViewScreen')
  },
  pageShare: function (e) {
    const t = e.onShareAppMessage
    e.onShareAppMessage = function () {
      const e = this
      meta.share_method = '\u8f6c\u53d1\u6d88\u606f\u5361\u7247'
      let a
      let i = t.apply(this, arguments)
      if (saPara.autoTrack && saPara.autoTrack.pageShare) {
        const r = {
          $url_path: getCurrentPath(),
          $share_depth: meta.query_share_depth,
          $share_method: meta.share_method,
        }
        setPageRefData(r), sa.autoTrackCustom.trackCustom('pageShare', r, '$MPShare')
      }
      function n(t) {
        return (
          isObject(t) || (t = {}),
          (isUndefined(t.path) || t.path === '') && (t.path = getCurrentUrl(e)),
          isString(t.path) &&
            (t.path.indexOf('?') === -1
              ? (t.path = t.path + '?')
              : t.path.slice(-1) !== '&' && (t.path = t.path + '&')),
          (t.path = t.path + getShareInfo()),
          t
        )
      }
      if (sa.para.allow_amend_share_path && isObject((i = n(i))))
        for (const s in i)
          if ((a = i[s]) && isFunction(a.then) && isFunction(a.catch))
            try {
              i[s] = i[s].then(function (e) {
                return n(e)
              })
            } catch (e) {
              log('onShareAppMessage: ' + e)
            }
      return i
    }
  },
  pageShareTimeline: function (e) {
    const t = e.onShareTimeline
    e.onShareTimeline = function () {
      meta.share_method = '\u670b\u53cb\u5708\u5206\u4eab'
      let e = t.apply(this, arguments)
      if (saPara.autoTrack && saPara.autoTrack.pageShare) {
        const a = {
          $url_path: getCurrentPath(),
          $share_depth: meta.query_share_depth,
          $share_method: meta.share_method,
        }
        setPageRefData(a), sa.autoTrackCustom.trackCustom('pageShare', a, '$MPShare')
      }
      return (
        saPara.allow_amend_share_path &&
          (typeof e !== 'object' && (e = {}),
          typeof e === 'object' && void 0 === e.query && (e.query = ''),
          typeof e === 'object' &&
            typeof e.query === 'string' &&
            e.query !== '' &&
            e.query.slice(-1) !== '&' &&
            (e.query = e.query + '&'),
          (e.query = e.query + getShareInfo())),
        e
      )
    }
  },
  pageAddFavorites: function () {
    const e = {}
    ;(e.$url_path = getCurrentPath()),
      saPara.autoTrack &&
        saPara.autoTrack.mpFavorite &&
        sa.autoTrackCustom.trackCustom('mpFavorite', e, '$MPAddFavorites')
  },
  pageHide: function () {
    sa.para.autoTrack && sa.para.autoTrack.pageLeave && sendPageLeave()
  },
}
function sendPageLeave() {
  let e = {}
  let t = ''
  try {
    t = (e = getCurrentPage()) ? e.route : ''
  } catch (e) {
    log(e)
  }
  if (meta.page_show_time >= 0 && t !== '') {
    const a = {}
    const i = getPageTitle(t)
    let r = (Date.now() - meta.page_show_time) / 1e3
    ;(isNaN(r) || r < 0) && (r = 0),
      (a.$url_query = e.sensors_mp_url_query ? e.sensors_mp_url_query : ''),
      (a.$url_path = t),
      (a.$title = i),
      (a.event_duration = r),
      saPara.autotrack_exclude_page.pageLeave.indexOf(t) === -1 && sa.track('$MPPageLeave', a),
      (meta.page_show_time = -1)
  }
}
const openid = {
  getRequest: function (e) {
    wx.login({
      success: function (t) {
        t.code && saPara.appid && saPara.openid_url
          ? wxrequest({
              url: saPara.openid_url + '&code=' + t.code + '&appid=' + saPara.appid,
              method: 'GET',
              complete: function (t) {
                isObject(t) && isObject(t.data) && t.data.openid ? e(t.data.openid) : e()
              },
            })
          : e()
      },
    })
  },
  getWXStorage: function () {
    const e = store.getStorage()
    if (e && isObject(e)) return e.openid
  },
  getOpenid: function (e) {
    if (!saPara.appid) return e(), !1
    const t = this.getWXStorage()
    t ? e(t) : this.getRequest(e)
  },
}
const functions = Object.freeze({
  __proto__: null,
  setProfile,
  setOnceProfile,
  appendProfile,
  incrementProfile,
  track,
  identify,
  resetAnonymousIdentity,
  trackSignup,
  login,
  loginWithKey,
  getAnonymousID,
  getIdentities,
  logout,
  getPresetProperties,
  setOpenid,
  unsetOpenid,
  bindOpenid,
  unbindOpenid,
  setUnionid,
  unsetUnionid,
  bindUnionid: setUnionid,
  unbindUnionid: unsetUnionid,
  initWithOpenid,
  bind,
  unbind,
  setWebViewUrl,
  quick,
  appLaunch,
  appShow,
  appHide,
  pageShow,
  setPara,
  getServerUrl,
  sendPageLeave,
  openid,
  autoTrackCustom,
  registerApp,
  register,
  clearAllRegister,
  clearAppRegister,
  clearAllProps,
})
function buildAPI(e) {
  for (const t in functions) e[t] = functions[t]
}
function setFirstVisitTime() {
  meta.is_first_launch && setOnceProfile({ $first_visit_time: new Date() })
}
function checkIsComplete() {
  ;(meta.initialState.isComplete = !0),
    meta.initialState.queue.length > 0 &&
      (each(meta.initialState.queue, function (e) {
        e[0] === 'appLaunch'
          ? sa.autoTrackCustom.appLaunch.apply(sa.autoTrackCustom, slice.call(e[1]))
          : sa[e[0]].apply(sa, slice.call(e[1]))
      }),
      (meta.initialState.queue = []))
}
function init(e) {
  if (!0 === meta.init_status) return !1
  function t() {
    checkIsComplete(), checkAppLaunch(), sa.ee.sdk.emit('ready')
  }
  ;(meta.init_status = !0),
    sa.ee.sdk.emit('beforeInit'),
    e && isObject(e) && sa.setPara(e),
    sa.ee.sdk.emit('initPara'),
    sa.ee.sdk.emit('afterInitPara'),
    sa.store.init(),
    sa.checkPluginInitStatus(),
    setFirstVisitTime(),
    sa.para.batch_send && sa.sendStrategy.init()
  const a = [getNetworkType(), getSystemInfo()].concat(meta.promise_list)
  Promise.all(a)
    .then(() => {
      t()
    })
    .catch(() => {
      t()
    })
}
function registerPropertyPlugin(e) {
  isFunction(e.properties)
    ? !e.isMatchedWithFilter || isFunction(e.isMatchedWithFilter)
      ? sa.ee.data.on('finalAdjustData', function (t) {
          try {
            isFunction(e.isMatchedWithFilter)
              ? e.isMatchedWithFilter(t) && e.properties(t)
              : e.properties(t)
          } catch (e) {
            log('execute registerPropertyPlugin callback error:' + e)
          }
        })
      : log('registerPropertyPlugin arguments error, isMatchedWithFilter must be function')
    : log('registerPropertyPlugin arguments error, properties must be function')
}
;(sa._ = _),
  (sa.modules = {}),
  (sa.meta = meta),
  (sa.kit = kit),
  (sa.mergeStorageData = mergeStorageData),
  (sa.dataStage = dataStage),
  (sa.sendStrategy = sendStrategy),
  (sa.store = store),
  (sa.usePlugin = usePlugin),
  (sa.checkPluginInitStatus = checkPluginInitStatus),
  (sa.eventSub = eventSub),
  (sa.events = new eventEmitter()),
  (sa.ee = ee),
  (sa.registerPropertyPlugin = registerPropertyPlugin),
  (sa.enableDataCollect = enableDataCollect),
  (sa.initialState = meta.initialState),
  (sa.IDENTITY_KEY = { EMAIL: IDENTITY_KEY.EMAIL, MOBILE: IDENTITY_KEY.MOBILE }),
  buildAPI(sa),
  apiStaging(),
  setNavigationBarTitle(),
  networkStatusChange(),
  initAppGlobalName(),
  initAppShowHide(),
  initPageProxy(),
  (sa.init = init)
const base = { plugin_version: '1.20.2' }
function createPlugin(e) {
  if (typeof e === 'object' && typeof e.plugin_name === 'string' && e.plugin_name !== '')
    return (
      (e.plugin_version = base.plugin_version),
      (e.log =
        e.log ||
        function () {
          typeof console === 'object' &&
            typeof console.log === 'function' &&
            console.log.apply(console, arguments)
        }),
      e
    )
  typeof console === 'object' &&
    typeof console.error === 'function' &&
    console.error('plugin must contain  proprerty "plugin_name"')
}
const disableSDK = {
  init(e) {
    ;(e.disableSDK = this.disableSDK.bind(this)),
      (e.enableSDK = this.enableSDK.bind(this)),
      (e.getDisabled = this.getDisabled.bind(this))
  },
  plugin_name: 'DisableSDK',
  disabled: !1,
  disableSDK() {
    this.disabled = !0
  },
  enableSDK() {
    this.disabled = !1
  },
  getDisabled() {
    return this.disabled
  },
}
const DisableSDK = createPlugin(disableSDK)
sa.usePlugin(DisableSDK)
export default sa
