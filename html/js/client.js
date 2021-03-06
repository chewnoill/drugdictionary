/* Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Namespace for accountchooser.
 */
var accountchooser = accountchooser || {};

/**
 * Export the namespace to global.
 */
window.accountchooser = accountchooser;

/**
 * Namespace for accountchooser experiments.
 */
accountchooser.experiments = accountchooser.experiments || {};

/**
 * @typedef {{
 *   email: string,
 *   displayName: (?string|undefined),
 *   providerId: (?string|undefined),
 *   photoUrl: (?string|undefined)
 * }}
 */
accountchooser.Account;

/**
 * @typedef {Array.<accountchooser.Account>}
 */
accountchooser.AccountList;

/**
 * @typedef {Array.<string>}
 */
accountchooser.IdpList;

/**
 * @typedef {{
 *   title: (?string|undefined),
 *   favicon: (?string|undefined),
 *   branding: (?string|undefined)
 * }}
 */
accountchooser.CustomUiOptions;



/**
 * Extends a parent class.
 * @param {Function} parentClass The parent class to be extended.
 */
Function.prototype.inheritsFrom = function(parentClass) {
  accountchooser.param.notEmptyFunction(parentClass, 'parentClass');

  /** @constructor */
  function tempClass() {};
  tempClass.prototype = parentClass.prototype;
  this.prototype = new tempClass();
  this.prototype.parentClass = parentClass.prototype;
  /** @override */
  this.prototype.constructor = this;
};

/**
 * Namespcae for parameter validators.
 */
accountchooser.param = accountchooser.param || {};

/**
 * Checks a parameter value is not null or undefined.
 * @param {*} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notNull = function(value, opt_paramName) {
  if (value === undefined || value === null) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be null.', opt_paramName);
  }
};

/**
 * Checks a parameter value is not empty. That is, the value must evaluate to
 * true.
 * @param {*} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmpty = function(value, opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
};

/**
 * Checks a parameter value must be a non-empty array.
 * @param {Object} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmptyArray = function(value, opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
  if (!accountchooser.util.isArray(value)) {
    accountchooser.param.throwError_(
        'Parameter %%param%% is not an array.', opt_paramName);
  }
  if (!value.length) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be an empty array.', opt_paramName);
  }
};

/**
 * Checks a parameter value must be a non-empty array.
 * @param {Object} value The value of a parameter.
 * @param {string=} opt_paramName An optional name of the parameter.
 */
accountchooser.param.notEmptyFunction = function(value,
    opt_paramName) {
  if (!value) {
    accountchooser.param.throwError_(
        'Parameter %%param%% cannot be empty.', opt_paramName);
  }
  if (!accountchooser.util.isFunction(value)) {
    accountchooser.param.throwError_(
        'Parameter %%param%% is not a function.', opt_paramName);
  }
};

/**
 * Throws an error to indicate a failed parameter validation.
 * @param {string} message The error message.
 * @param {string=} opt_paramName An optional name of the parameter.
 * @private
 */
accountchooser.param.throwError_ = function(message, opt_paramName) {
  try {
    if (console && console.trace) {
      console.trace();
    }
  } catch (e) {
  }
  var param = opt_paramName ? ' \'' + opt_paramName + '\'' : '';
  throw message.replace(/\%\%param\%\%/g, param);
};

/**
 * Namespace for utility functions.
 */
accountchooser.util = accountchooser.util || {};

/**
 * Logs a message to the console of the browser for debugging.
 * @param {string} message The message to log.
 */
accountchooser.util.log = function(message) {
  try {
    if (window.console && window.console.log) {
      window.console.log(message);
    }
  } catch (ex) {
    // Ignore if cannot log to console.
  }
};

/**
 * Checks whether an experiment is on.
 * @param {string} experiment The name of the experiment.
 * @return {boolean} {@code true} if the experiment is on.
 */
accountchooser.util.isExperimentOn = function(experiment) {
  return !!accountchooser.experiments[experiment];
};

// Utility functions which are to substitute for jQuery ones.
/**
 * Checks whether the value is an array or not.
 * Try to use jQuery.isArray if possible.
 * @param {Object} value The value to be checked.
 * @return {boolean} True if it's an array, false otherwise.
 */
accountchooser.util.isArray = function(value) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/**
 * Checks whether the value is a function or not.
 * Try to use jQuery.isFunction if possible.
 * @param {Object} value The value to be checked.
 * @return {boolean} True if it's a function, false otherwise.
 */
accountchooser.util.isFunction = function(value) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.isFunction(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Function]';
  }
};

/**
 * Checks whether the elements is in the array and returns the index of it.
 * Try to use jQuery.inArray if possible.
 * @param {*} element The element to be checked.
 * @param {Array.<*>} array The array to be searched.
 * @return {number} The index of the element in the array. If the element is not
 *     in the array, -1 is returned.
 */
accountchooser.util.indexOf = function(element, array) {
  if (array) {
    if (typeof jQuery !== 'undefined') {
      return jQuery.inArray(element, array);
    }
    if (array.indexOf) {
      return array.indexOf(element);
    }
    var length = array.length;
    for (var i = 0; i < length; i++) {
      if (i in array && array[i] === element) {
        return i;
      }
    }
  }
  return -1;
};

/**
 * Trims the leading and trailing space characters.
 * Try to use jQuery.trim if possible.
 * @param {string} str The string to be trimmed.
 * @return {string} The trimmed string.
 */
accountchooser.util.trim = function(str) {
  if (typeof jQuery !== 'undefined') {
    return jQuery.trim(str);
  }
  if (str == null) {
    return '';
  } else if (String.prototype.trim) {
    return String.prototype.trim.call(str);
  } else {
    return str.replace(/^[\s\xa0]+/, '').replace(/[\s\xa0]+$/, '');
  }
};

/**
 * Merges several objects into the first object.
 * Try to use jQuery.extend if possible.
 * @param {boolean} deep Whether to performe deep copy or not.
 * @param {Object} target The object to receive the properties from other ones.
 * @param {...Object} var_objects A set of objects to merge in.
 * @return {Object} The merged object.
 */
accountchooser.util.extend = function(deep, target, var_objects) {
  // If no target provided, return {}. If no other objects to merge in, return
  // target unmodifed..
  if (arguments.length < 3) {
    return target || {};
  }
  if (typeof jQuery !== 'undefined') {
    // If deep == false, don't pass it to jQuery.extend since it'll be treated
    // as the target.
    var args = Array.prototype.slice.call(arguments, deep ? 0 : 1);
    return jQuery.extend.apply(jQuery, args);
  }
  if (typeof target !== 'object' || target == null) {
    target = {};
  }
  for (var i = 2, num = arguments.length; i < num; i++) {
    var obj = arguments[i];
    if (obj == null) {
      continue;
    }
    for (var name in obj) {
      // Skip undefined properties and itself.
      if (obj[name] === undefined || target === obj[name]) {
        continue;
      }
      if (deep && typeof obj[name] == 'object') {
        // Make sure target property is array if the source property is array.
        if (accountchooser.util.isArray(obj[name]) &&
            !accountchooser.util.isArray(target[name])) {
          target[name] = [];
        }
        target[name] =
            accountchooser.util.extend(true, target[name], obj[name]);
      } else {
        target[name] = obj[name];
      }
    }
  }
  return target;
};



/**
 * List of supported language which is denoted by its normalized code.
 * @const {Array.<string>}
 * @private
 */
accountchooser.util.SUPPORTED_LANGUAGE_ = [
  'en', // English (American)
  'en_gb', // English (British)
  'fr', // French (European)
  'it', // Italian
  'de', // German
  'es', // Spanish (European)
  'zh_cn', // Chinese (Simplified, Mandarin)
  'zh_tw', // Chinese (Traditional, Mandarin)
  'ja', // Japanese
  'ko', // Korean
  'nl', // Dutch
  'pl', // Polish
  'pt', // Portuguese (Brazilian)
  'ru', // Russian
  'th', // Thai
  'tr', // Turkish
  'bg', // Bulgarian
  'ca', // Catalan
  'hr', // Croatian
  'cs', // Czech
  'da', // Danish
  'fil', // Filipino
  'fi', // Finnish
  'el', // Greek
  'hi', // Hindi
  'hu', // Hungarian
  'id', // Indonesian
  'lv', // Latvian
  'lt', // Lithuanian
  'no', // Norwegian
  'pt_pt', // Portuguese (European)
  'ro', // Romanian
  'sr', // Serbian (Cyrillic)
  'sk', // Slovak
  'sl', // Slovenian
  'sv', // Swedish
  'uk', // Ukrainian
  'vi', // Vietnamese
  'ar', // Arabic (Modern Standard)
  'iw' // Hebrew
];

/**
 * Language codes map which maps the alternative code to the normolized code in
 * the list of supported language.
 * @const {Object.<string, string>}
 * @private
 */
accountchooser.util.ALTERNATIVE_CODES_MAP_ = {
  // English (American)
  'en_us': 'en',
  // Chinese (Simplified, Mandarin)
  'zh': 'zh_cn',
  'zh_hans': 'zh_cn',
  'zh_hans_cn': 'zh_cn',
  // Chinese (Traditional, Mandarin)
  'zh_hant': 'zh_tw',
  'zh_hant_tw': 'zh_tw',
  // Dutch
  'nl_nl': 'nl',
  // French
  'fr_fr': 'fr',
  // German
  'de_de': 'de',
  // Italian
  'it_it': 'it',
  // Japanese
  'ja_jp': 'ja',
  // Korean
  'ko_kr': 'ko',
  // Polish
  'pl_pl': 'pl',
  // Portuguese (Brazilian)
  'pt_br': 'pt',
  // Russian
  'ru_ru': 'ru',
  // Spanish (European)
  'es_es': 'es',
  // Thai
  'th_th': 'th',
  // Turkish
  'tr_tr': 'tr',
  // Bulgarian
  'bg_bg': 'bg',
  // Catalan
  'ca_es': 'ca',
  // Croatian
  'hr_hr': 'hr',
  // Czech
  'cs_cz': 'cs',
  // Danish
  'da_dk': 'da',
  // Filipino
  'fil_ph': 'fil',
  'tl': 'fil',
  // Finnish
  'fi_fi': 'fi',
  // Greek
  'el_gr': 'el',
  // Hindi
  'hi_in': 'hi',
  // Hungarian
  'hu_hu': 'hu',
  // Indonesian
  'id_id': 'id',
  // Latvian
  'lv_lv': 'lv',
  // Lithuanian
  'lt_lt': 'lt',
  // Norwegian
  'no_no': 'no',
  'nb': 'no',
  'nb_no': 'no',
  // Romanian
  'ro_ro': 'ro',
  // Serbian (Cyrillic)
  'sr_cyrl_rs': 'sr',
  // Slovak
  'sk_sk': 'sk',
  // Slovenian
  'sl_si': 'sl',
  // Swedish
  'sv_se': 'sv',
  // Ukrainian
  'uk_ua': 'uk',
  // Vietnamese
  'vi_vn': 'vi',
  // Arabic (Modern Standard)
  'ar_eg': 'ar',
  // Hebrew
  'iw_il': 'iw',
  'he': 'iw',
  'he_il': 'iw'
};

/**
 * Finds the normalized code in the supported language list for a given one. If
 * there's no exactly matched one, try to match the higer level. i.e., 'zh-HK'
 * will get 'zh' as result, which is eventually mapped to 'zh_cn'. If no code is
 * found, {@code undefined} is returned.
 * @param {string} language The language code.
 * @return {string|undefined} The normalized language code.
 */
accountchooser.util.findLanguageCode = function(language) {
  // Normalize language code
  var lang = language && language.replace(/-/g, '_').toLowerCase();
  var code;
  while (lang) {
    if (accountchooser.util.indexOf(lang,
        accountchooser.util.SUPPORTED_LANGUAGE_) > -1) {
      code = lang;
      break;
    } else if (accountchooser.util.ALTERNATIVE_CODES_MAP_[lang]) {
      code = accountchooser.util.ALTERNATIVE_CODES_MAP_[lang];
      break;
    }
    var parts = lang.split('_');
    parts.pop();
    lang = parts.join('_');
  }
  return code;
};

/**
 * Checks if the language is right-to-left or not.
 * @param {string} language The language code.
 * @return {boolean} {@code true} if the language is rtl.
 */
accountchooser.util.isRightToLeft = function(language) {
  var lang = accountchooser.util.findLanguageCode(language);
  // Arabic or Hebrew
  return lang == 'ar' || lang == 'iw';
};



/**
 * Checks if the url scheme is http or https.
 * @param {string} url The url to be checked.
 * @return {boolean} {@code true} if it is http or https scheme.
 */
accountchooser.util.isHttpOrHttpsUrl = function(url) {
  return /^https?:\/\//i.test(url);
};

/**
 * Checks if the url scheme is https.
 * @param {string} url The url to be checked.
 * @return {boolean} {@code true} if it is https scheme.
 */
accountchooser.util.isHttpsUrl = function(url) {
  return /^https:\/\//i.test(url);
};

/**
 * Parses a URL string into a Url object. If the URL is a path other than an
 * absolute URL, the current location is used to compute the absolute URL.
 * @param {string} url The URL string.
 * @return {accountchooser.util.Url} The Url object.
 */
accountchooser.util.parseUrl = function(url) {
  var a = document.createElement('a');
  a.href = url;
  // IE fix: IE doesn't set the protocol/host for relative URL but sets the
  // 'href' to the converted absolute URL. We set the 'href' again with the
  // absolute URL so that it returns the correct protocol and host.
  a.href = a.href;
  var protocol = a.protocol;
  if (!/^https?:$/i.test(protocol)) {
    return null;
  }
  var host = a.host;
  var path = a.pathname;
  // Safari 4 fix: use hostname instead of host
  if (a.hostname.length > a.host.length) {
    host = a.hostname;
  }
  // IE fix: remove port if it is 80/443 for http/https and add leading '/'
  // for pathname.
  if (protocol == 'http:' && host.slice(-3) == ':80') {
    host = host.slice(0, -3);
  } else if (protocol == 'https:' && host.slice(-4) == ':443') {
    host = host.slice(0, -4);
  }
  if (!path) {
    path = '/';
  } else if (path[0] != '/') {
    path = '/' + path;
  }
  var query = a.search;
  var fragment = a.hash;
  return new accountchooser.util.Url(protocol, host, path, query, fragment);
};

/**
 * Creates a Url object from the given parts. Only http or https URLs are
 * supported.
 * @param {string} protocol The protocol of the URL. e.g., "http:".
 * @param {string} host The host of the URL, including the port if any.
 * @param {string} path The path of the URL, starting with "/".
 * @param {string=} opt_query The query of the URL, starting with "?" if any..
 * @param {string=} opt_fragment The fragment of the URL, starting with "#" if
 *     any.
 * @constructor
 */
accountchooser.util.Url = function(protocol, host, path, opt_query,
    opt_fragment) {
  this.protocol_ = protocol;
  this.host_ = host;
  this.path_ = path;
  this.query_ = opt_query || '';
  this.fragment_ = opt_fragment || '';
  /**
   * @type {Object.<string>}
   * @private
   */
  this.queryParameters_ = null;
  /**
   * @type {Object.<string>}
   * @private
   */
  this.fragmentParameters_ = null;
  this.validate_();
};

/**
 * Validates the Url object.
 * @private
 */
accountchooser.util.Url.prototype.validate_ = function() {
  if (!/^https?:$/i.test(this.protocol_)) {
    throw 'Invalid URL protocol: ' + this.protocol_;
  }
  if (!this.host_) {
    throw 'Invalid URL host: ' + this.host_;
  }
  if (!this.path_ || this.path_[0] != '/') {
    throw 'Invalid URL path: ' + this.path_;
  }
  if (this.query_ && this.query_[0] != '?') {
    throw 'Invalid URL query: ' + this.query_;
  }
  if (this.fragment_ && this.fragment_[0] != '#') {
    throw 'Invalid URL fragment: ' + this.fragment_;
  }
};

/**
 * @return {string} The protocol of the URL.
 */
accountchooser.util.Url.prototype.getProtocol = function() {
  return this.protocol_;
};

/**
 * @return {string} The host of the URL.
 */
accountchooser.util.Url.prototype.getHost = function() {
  return this.host_;
};

/**
 * @return {string} The path of the URL.
 */
accountchooser.util.Url.prototype.getPath = function() {
  return this.path_;
};

/**
 * @return {string} The query of the URL.
 */
accountchooser.util.Url.prototype.getQuery = function() {
  return this.query_;
};

/**
 * @return {string} The fragment of the URL.
 */
accountchooser.util.Url.prototype.getFragment = function() {
  return this.fragment_;
};

/**
 * @return {string} The base URL string which contains the protocol, host and
 *     path.
 */
accountchooser.util.Url.prototype.getBaseString = function() {
  return this.protocol_ + '//' + this.host_ + this.path_;
};

/**
 * @return {Object.<string>} The key-value pairs of the query paraments.
 */
accountchooser.util.Url.prototype.getQueryParameters = function() {
  if (!this.queryParameters_) {
    this.queryParameters_ = this.parseParameters_(this.query_, true);
  }
  return this.queryParameters_;
};

/**
 * @param {string} name The query parameter name.
 * @return {string|undefined} The query parameter value with the given name.
 */
accountchooser.util.Url.prototype.getQueryParameter = function(name) {
  return this.getQueryParameters()[name];
};

/**
 * @return {Object.<string>} The key-value pairs of the fragment paraments.
 */
accountchooser.util.Url.prototype.getFragmentParameters = function() {
  if (!this.fragmentParameters_) {
    this.fragmentParameters_ = this.parseParameters_(this.fragment_, false);
  }
  return this.fragmentParameters_;
};

/**
 * @param {string} name The query parameter name.
 * @return {string|undefined} The query parameter value with the given name.
 */
accountchooser.util.Url.prototype.getFragmentParameter = function(name) {
  return this.getFragmentParameters()[name];
};

/**
 * Parses the parameters string into a key-value pairs. If it has repeated
 * parameter, the first value is used.
 * @param {string} paramString The parameters string.
 * @param {boolean} forQuery Indicate that the parameters string is from query
 *     or fragment.
 * @return {Object.<string>} The key-value pairs of the parameters.
 * @private
 */
accountchooser.util.Url.prototype.parseParameters_ = function(paramString,
    forQuery) {
  var params = {};
  var prefix = forQuery ? '?' : '#';
  if (paramString) {
    if (paramString[0] == prefix) {
      paramString = paramString.substr(1);
    }
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var name = pair[0];
      var value = pair[1];
      if (!params[name]) {
        params[name] = value;
      }
    }
  }
  return params;
};

/**
 * Appends query parameters.
 * @param {Object} params The key-value parameters to be added.
 */
accountchooser.util.Url.prototype.addQueryParameters = function(params) {
  this.appendParameters_(params, true);
};

/**
 * Appends one parameter with the given name and value to the query.
 * @param {string} name The name of the parameter.
 * @param {*} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.addQueryParameter = function(
    name, opt_value) {
  var params = {};
  params[name] = opt_value;
  this.addQueryParameters(params);
};

/**
 * Appends fragment parameters.
 * @param {Object} params The key-value parameters to be added.
 */
accountchooser.util.Url.prototype.addFragmentParameters = function(params) {
  this.appendParameters_(params, false);
};

/**
 * Appends one parameter with the given name and value to the fragment.
 * @param {string} name The name of the parameter.
 * @param {*} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.addFragmentParameter = function(
    name, opt_value) {
  var params = {};
  params[name] = opt_value;
  this.addFragmentParameters(params);
};

/**
 * Appends the parameters to the URL.
 * @param {Object} params The key-value parameters to be added.
 * @param {boolean} forQuery Whether to add the parameters to the query or the
 *    fragment.
 * @private
 */
accountchooser.util.Url.prototype.appendParameters_ = function(params,
    forQuery) {
  var temp = [];
  for (var name in params) {
    var value = params[name];
    if (value == null) {
      temp.push(name);
    } else {
      temp.push(name + '=' + value);
    }
  }
  var paramString = temp.join('&');
  if (paramString) {
    if (forQuery) {
      if (this.query_) {
        this.query_ += '&' + paramString;
      } else {
        this.query_ = '?' + paramString;
      }
      this.queryParameters_ = null;
    } else {
      if (this.fragment_) {
        this.fragment_ += '&' + paramString;
      } else {
        this.fragment_ = '#' + paramString;
      }
      this.fragmentParameters_ = null;
    }
  }
};

/**
 * Replaces a query parameter with the given value. If the value is not
 * specified or null, the parameter is removed. If the parameter doesn't exist,
 * it is added.
 * @param {string} name The name of the parameter.
 * @param {*=} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.replaceQueryParameter = function(name,
    opt_value) {
  var params = /** @type {Object} */ (this.getQueryParameters());
  if (opt_value == null) {
    delete params[name];
  } else {
    params[name] = opt_value;
  }
  this.query_ = '';
  this.addQueryParameters(params);
};

/**
 * Replaces a fragment parameter with the given value. If the value is not
 * specified or null, the parameter is removed. If the parameter doesn't exist,
 * it is added.
 * @param {string} name The name of the parameter.
 * @param {*=} opt_value The value of the parameter.
 */
accountchooser.util.Url.prototype.replaceFragmentParameter = function(name,
    opt_value) {
  var params = /** @type {Object} */ (this.getFragmentParameters());
  if (opt_value == null) {
    delete params[name];
  } else {
    params[name] = opt_value;
  }
  this.fragment_ = '';
  this.addFragmentParameters(params);
};

/**
 * @return {string} The string URL.
 */
accountchooser.util.Url.prototype.toString = function() {
  return this.protocol_ + '//' + this.host_ + this.path_ + this.query_ +
      this.fragment_;
};

/**
 * Checks if it matches the other URL. The query and fragment parts are ignored.
 * @param {accountchooser.util.Url|string} other The other URL.
 * @return {boolean} {@code true} if the two match.
 */
accountchooser.util.Url.prototype.match = function(other) {
  if (typeof other == 'string') {
    other = accountchooser.util.parseUrl(other);
  }
  if (!(other instanceof accountchooser.util.Url)) {
    return false;
  } else {
    return this.protocol_ == other.protocol_ &&
        this.host_ == other.host_ &&
        this.path_ == other.path_;
  }
};

/**
 * Creates a new Url object by using the current one as the base. If the new url
 * is not specified, the current one is cloned. If it is an absolute URL, itself
 * is returned.
 * @param {string=} opt_url The new url. It can be an absolute URL, or an
 *     absolute path, or an relative path.
 * @return {accountchooser.util.Url} The new Url object.
 */
accountchooser.util.Url.prototype.asBase = function(opt_url) {
  if (!opt_url) {
    // return a copy of current one.
    return new accountchooser.util.Url(this.protocol_, this.host_, this.path_,
        this.query_, this.fragment_);
  } else if (accountchooser.util.isHttpOrHttpsUrl(opt_url)) {
    // return the absolute URL itself.
    return accountchooser.util.parseUrl(opt_url);
  } else if (opt_url[0] == '/') {
    // absolute path.
    return accountchooser.util.parseUrl(
        this.protocol_ + '//' + this.host_ + opt_url);
  } else {
    // relative path.
    var components = this.path_.split('/');
    components[components.length - 1] = opt_url;
    return accountchooser.util.parseUrl(
        this.protocol_ + '//' + this.host_ + components.join('/'));
  }
};


/**
 * Base validator.
 * @constructor
 */
accountchooser.util.Validator = function() {
  this.exceptionHandler_ = null;
};

/**
 * Sets the exception handler.
 * @param {function(?, Error)} handler The exception handler.
 * @return {accountchooser.util.Validator} The validator itself.
 */
accountchooser.util.Validator.prototype.setExceptionHandler = function(
    handler) {
  this.exceptionHandler_ = handler;
  return this;
};

/**
 * Validates the value.
 * @param {?} value The value to be validated.
 * @return {?} The validated value.
 */
accountchooser.util.Validator.prototype.validate = function(value) {
  try {
    return this.execute(value);
  } catch (e) {
    if (this.exceptionHandler_) {
      return this.exceptionHandler_(value, e);
    } else {
      // re-throw
      throw e;
    }
  }
};

/**
 * Validates the value. If it's invalid, an error is thrown.
 * @param {?} value The value to be validated.
 * @return {?} The validated value.
 * @protected
 */
accountchooser.util.Validator.prototype.execute = function(value) {
  throw new Error('Not implemented');
};

/**
 * A validator that validates nothing.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.NoopValidator = function() {};
accountchooser.util.NoopValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @protected
 */
accountchooser.util.NoopValidator.prototype.execute = function(value) {
  return value;
};

/**
 * A validator that validates a boolean value.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.BooleanValidator = function() {};
accountchooser.util.BooleanValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {?} value The value to be validated.
 * @return {boolean} The validated value.
 * @protected
 */
accountchooser.util.BooleanValidator.prototype.execute = function(value) {
  return !!value;
};

/**
 * A validator that validates a language code.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.LanguageValidator = function() {};
accountchooser.util.LanguageValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {string} language The language code to be validated.
 * @return {string|undefined} The validated language code.
 * @protected
 */
accountchooser.util.LanguageValidator.prototype.execute = function(language) {
  return accountchooser.util.findLanguageCode(language);
};

/**
 * A validator that validates a value belongs to an Enum.
 * @param {Object} enums The enum set.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.EnumValidator = function(enums) {
  this.enums_ = enums;
};
accountchooser.util.EnumValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 */
accountchooser.util.EnumValidator.prototype.execute = function(value) {
  for (var name in this.enums_) {
    if (value == this.enums_[name]) {
      return value;
    }
  }
  throw new Error(value + ' is not a valid enum');
};

/**
 * A validator that validates text.
 * @param {number} maxLength The maximum length for the text. 0 means no maximum
 *     length.
 * @param {boolean} truncate Whether to truncate the text or throw an error when
 *     the text exceeds the maximum length.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.TextValidator = function(maxLength, truncate) {
  this.maxLength_ = maxLength;
  this.truncate_ = truncate;
};
accountchooser.util.TextValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {string} text The text to be validated.
 * @return {string} The validated text.
 * @protected
 */
accountchooser.util.TextValidator.prototype.execute = function(text) {
  if (this.maxLength_ && text.length > this.maxLength_) {
    if (this.truncate_) {
      text = text.substr(0, this.maxLength_);
    } else {
      throw new Error('Text is too long. MaxLen: ' + this.maxLength_);
    }
  }
  return text;
};

/**
 * A validator that sanitizes and validates text.
 * @param {number} maxLength The maximum length for the text.
 * @param {boolean} truncate Whether to truncate the text or throw an error when
 *     the text exceeds the maximum length.
 * @constructor
 * @extends {accountchooser.util.TextValidator}
 */
accountchooser.util.TextSanitizer = function(maxLength, truncate) {
  accountchooser.util.TextValidator.call(this, maxLength, truncate);
};
accountchooser.util.TextSanitizer.inheritsFrom(
    accountchooser.util.TextValidator);

/**
 * @override
 * @param {string} text The text to be validated.
 * @return {string} The validated text.
 * @protected
 */
accountchooser.util.TextSanitizer.prototype.execute = function(text) {
  // Use html-css-sanitizer to sanitze the text. All HTML tags are removed.
  // In some environments which don't load html-css-sanitizer, just skip the
  // sanitization.
  if (typeof html != 'undefined' && html && html.sanitizeWithPolicy) {
    text = html.sanitizeWithPolicy(text, function() {});
  }
  return accountchooser.util.TextValidator.prototype.execute.call(this, text);
};

/**
 * A validator that validates a URL.
 * @param {number} maxLength The maximum length for the URL.
 * @param {string=} opt_origin The allowed origin for the URL.
 * @param {boolean=} opt_httpsOnly If {@code true}, only HTTPS URL is allowed.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.UrlValidator = function(maxLength, opt_origin,
    opt_httpsOnly) {
  this.maxLength_ = maxLength;
  this.origin_ = (opt_origin && opt_origin.replace(/^https?:\/\//, '')) || '';
  this.httpsOnly = !!opt_httpsOnly;
};
accountchooser.util.UrlValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {string} url The URL to be validated.
 * @return {string} The validated URL.
 * @protected
 */
accountchooser.util.UrlValidator.prototype.execute = function(url) {
  if (url.length > this.maxLength_) {
    throw new Error('URL is too long. MaxLen: ' + this.maxLength_);
  }
  if ((!this.httpsOnly && !accountchooser.util.isHttpOrHttpsUrl(url)) ||
      (this.httpsOnly && !accountchooser.util.isHttpsUrl(url))) {
    throw new Error('Invalid scheme: ' + url);
  }
  if (this.origin_ &&
      accountchooser.util.parseUrl(url).getHost() != this.origin_) {
    throw new Error('Invalid domain: ' + url);
  }
  return url;
};

/**
 * A validator that validates each element in an arry.
 * @param {accountchooser.util.Validator} validator The validator used to
 *     validate each element of an array.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.ArrayValidator = function(validator) {
  this.validator_ = validator;
};
accountchooser.util.ArrayValidator.inheritsFrom(accountchooser.util.Validator);

/**
 * @override
 * @param {Array} array The array to be validated.
 * @return {Array} The validated array.
 * @protected
 */
accountchooser.util.ArrayValidator.prototype.execute = function(array) {
  if (!accountchooser.util.isArray(array)) {
    throw new Error('Not an array');
  }
  for (var i = 0; i < array.length; i++) {
    array[i] = this.validator_.validate(array[i]);
  }
  return array;
};

/**
 * A validator that validates each field in an object.
 * @param {boolean} failOnUnrecognized Whether to throw an error or delete it
 *     for an unrecognized field in the object.
 * @constructor
 * @extends {accountchooser.util.Validator}
 */
accountchooser.util.ObjectValidator = function(failOnUnrecognized) {
  this.failOnUnrecognized_ = failOnUnrecognized;
  this.required_ = {};
  this.optional_ = {};
};
accountchooser.util.ObjectValidator.inheritsFrom(
    accountchooser.util.Validator);

/**
 * @override
 * @param {Object} object The object to be validated.
 * @return {Object} The validated object.
 * @protected
 */
accountchooser.util.ObjectValidator.prototype.execute = function(object) {
  for (var name in object) {
    // Find the corresponding validator.
    var validator = this.required_[name] || this.optional_[name];
    if (validator) {
      // Validate the property if it's not null.
      if (object[name] != null) {
        object[name] = validator.validate(object[name]);
      }
    } else if (this.failOnUnrecognized_) {
      // Fail on unrecognized field.
      throw new Error('Unrecognized field: ' + name);
    } else {
      // Remove the unrecognized field.
      delete object[name];
    }
    // If the property value is null after validation, remove it.
    if (object[name] == null) {
      delete object[name];
    }
  }
  this.checkRequired_(object);
  return object;
};

/**
 * Adds an validator for a required field.
 * @param {string} name The name for the field.
 * @param {accountchooser.util.Validator} validator The validator for the field.
 * @return {accountchooser.util.ObjectValidator} The validator itself.
 */
accountchooser.util.ObjectValidator.prototype.addRequired = function(name,
    validator) {
  if (name in this.optional_) {
    throw new Error(name + ' can not be both required and optional.');
  }
  this.required_[name] = validator;
  return this;
};

/**
 * Adds an validator for an optional field.
 * @param {string} name The name for the field.
 * @param {accountchooser.util.Validator} validator The validator for the field.
 * @return {accountchooser.util.ObjectValidator} The validator itself.
 */
accountchooser.util.ObjectValidator.prototype.addOptional = function(name,
    validator) {
  if (name in this.required_) {
    throw new Error(name + ' can not be both required and optional.');
  }
  this.optional_[name] = validator;
  return this;
};

/**
 * Checks if the object contains all the required fields. If not, an er
 * @param {Object} object The object to be validated.
 * @private
 */
accountchooser.util.ObjectValidator.prototype.checkRequired_ = function(
    object) {
  for (var name in this.required_) {
    if (object[name] == null) {
      throw new Error(name + ' is required.');
    }
  }
};

// Predefined validators.

/** @const {accountchooser.util.NoopValidator} */
accountchooser.util.V_NOOP = new accountchooser.util.NoopValidator();

/** @const {accountchooser.util.BooleanValidator} */
accountchooser.util.V_BOOLEAN = new accountchooser.util.BooleanValidator();

/** @const {accountchooser.util.LanguageValidator} */
accountchooser.util.V_LANGUAGE = new accountchooser.util.LanguageValidator();

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_EMAIL =
    new accountchooser.util.TextSanitizer(128, true);

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_DISPLAY_NAME =
    new accountchooser.util.TextSanitizer(128, true);

/**
 * For account photoUrl, we don't fail on invalid photoUrl. Just discard it.
 * @const {accountchooser.util.UrlValidator}
 */
accountchooser.util.V_ACCOUNT_PHOTO_URL =
    /** @type {accountchooser.util.UrlValidator} */
    (new accountchooser.util.UrlValidator(2048, undefined, true).
        setExceptionHandler(function(value, ex) {}));

/** @const {accountchooser.util.TextSanitizer} */
accountchooser.util.V_ACCOUNT_PROVIDER_ID =
    new accountchooser.util.TextSanitizer(128, true);

/** @const {accountchooser.util.Validator} */
accountchooser.util.V_PROVIDER_LIST = new accountchooser.util.ArrayValidator(
    accountchooser.util.V_ACCOUNT_PROVIDER_ID);

/** @const {accountchooser.util.ObjectValidator} */
accountchooser.util.V_ACCOUNT = new accountchooser.util.ObjectValidator(true).
    addRequired('email', accountchooser.util.V_ACCOUNT_EMAIL).
    addOptional('displayName', accountchooser.util.V_ACCOUNT_DISPLAY_NAME).
    addOptional('photoUrl', accountchooser.util.V_ACCOUNT_PHOTO_URL).
    addOptional('providerId', accountchooser.util.V_ACCOUNT_PROVIDER_ID);

/** @const {accountchooser.util.ArrayValidator} */
accountchooser.util.V_ACCOUNT_LIST = new accountchooser.util.ArrayValidator(
    accountchooser.util.V_ACCOUNT);



/**
 * Namespace for accountchooser RPC.
 */
accountchooser.rpc = accountchooser.rpc || {};

/**
 * Base class for all RPC objects (Request, Response, and Notification).
 * @constructor
 */
accountchooser.rpc.RpcObject = function() {};

/**
 * Sets the timestamp for the RpcObject. If the timestamp is not provided, the
 * current time is used.
 * @param {number=} opt_timestamp The timestamp for this RpcObject.
 */
accountchooser.rpc.RpcObject.prototype.setTimestamp = function(opt_timestamp) {
  this.timestamp_ = opt_timestamp || new Date().getTime();
};

/**
 * Converts the RPC object to a normal object and sets the storage timestamp.
 * @return {Object} The normal object represents the RPC object.
 */
accountchooser.rpc.RpcObject.prototype.toJSON = function() {
  var json = {jsonrpc: '2.0'};
  if (this.timestamp_ != null) {
    json.timestamp = this.timestamp_;
  }
  return json;
};

/**
 * Returns the JSON String format of the RPC object.
 * @return {string} The JSON String format.
 */
accountchooser.rpc.RpcObject.prototype.toString = function() {
  return JSON.stringify(this.toJSON());
};

/**
 * Base class for ClientRequest and Notification.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.RpcObject}
 */
accountchooser.rpc.Request = function(method, opt_params) {
  accountchooser.param.notEmpty(method, 'method');
  this.method_ = method;
  this.params_ = opt_params;
};
accountchooser.rpc.Request.inheritsFrom(accountchooser.rpc.RpcObject);

/**
 * Returns the name of the method to be invoked.
 * @return {string} The name of the method to be invoked.
 */
accountchooser.rpc.Request.prototype.getMethod = function() {
  return this.method_;
};

/**
 * Returns the parameter values to be used during the invocation of the method.
 * @return {Object|undefined} The parameter values to be used during the
 *     invocation of the method.
 */
accountchooser.rpc.Request.prototype.getParameters = function() {
  return this.params_;
};

/**
 * Returns the value of the parameter with the given name.
 * @param {string} name The name of the parameter.
 * @return {*} The parameter value.
 */
accountchooser.rpc.Request.prototype.getParameter = function(name) {
  return this.params_ && this.params_[name];
};

/**
 * @override
 */
accountchooser.rpc.Request.prototype.toJSON = function() {
  var json = accountchooser.rpc.RpcObject.prototype.toJSON.call(this);
  if (this.method_ != null) {
    json.method = this.method_;
  }
  if (this.params_ != null) {
    json.params = this.params_;
  }
  return json;
};

/**
 * Notification class, which is a request without a response.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.Request}
 */
accountchooser.rpc.Notification = function(method, opt_params) {
  accountchooser.rpc.Request.call(this, method, opt_params);
};
accountchooser.rpc.Notification.inheritsFrom(accountchooser.rpc.Request);

/**
 * ClientRequest class, which is sent from client side and requires a response.
 * @param {string} id The id of the request.
 * @param {string} method The name of the method to be invoked.
 * @param {Object=} opt_params The parameter values to be used during the
 *     invocation of the method.
 * @constructor
 * @extends {accountchooser.rpc.Request}
 */
accountchooser.rpc.ClientRequest = function(id, method, opt_params) {
  accountchooser.param.notEmpty(id, 'id');
  accountchooser.rpc.Request.call(this, method, opt_params);
  this.id_ = id;
};
accountchooser.rpc.ClientRequest.inheritsFrom(accountchooser.rpc.Request);

/**
 * Returns the request id.
 * @return {string} The id of the request.
 */
accountchooser.rpc.ClientRequest.prototype.getId = function() {
  return this.id_;
};

/**
 * @override
 */
accountchooser.rpc.ClientRequest.prototype.toJSON = function() {
  var json = accountchooser.rpc.Request.prototype.toJSON.call(this);
  if (this.id_ != null) {
    json.id = this.id_;
  }
  return json;
};

/**
 * Gets the value of the client config with the given key. If the key is not
 * specified, then the whole config object is returned.
 * @param {string} opt_key The client config key.
 * @return {*} The value of the client config.
 */
accountchooser.rpc.ClientRequest.prototype.getClientConfig = function(opt_key) {
  var clientConfig =
      /** @type {Object|undefined} */ (this.getParameter('clientConfig'));
  if (opt_key) {
    return clientConfig && clientConfig[opt_key];
  } else {
    return clientConfig;
  }
};

/**
 * Validates the request.
 * @param {accountchooser.util.Validator} validator The validator used to
 *     validate the request.
 */
accountchooser.rpc.ClientRequest.prototype.validate = function(validator) {
  validator.validate(this.getParameters());
};

/**
 * Response class, which represents an RPC response for a request. It must have
 * either a result or an error.
 * @param {string} id The id of the request object.
 * @param {*=} opt_result The result of the RPC request.
 * @param {Object=} opt_error The error information.
 * @constructor
 * @extends {accountchooser.rpc.RpcObject}
 */
accountchooser.rpc.Response = function(id, opt_result, opt_error) {
  accountchooser.param.notEmpty(id, 'id');
  if (opt_result != null && opt_error != null) {
    throw 'opt_result and opt_error can not be both set.';
  }
  if (opt_result == null && opt_error == null) {
    throw 'Either opt_result or opt_error should be set.';
  }
  this.id_ = id;
  this.result_ = opt_result;
  this.error_ = opt_error;
};
accountchooser.rpc.Response.inheritsFrom(accountchooser.rpc.RpcObject);

/**
 * Parses a plain object into a Response.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.Response} A Response if possible.
 */
accountchooser.rpc.Response.parse = function(object) {
  if (object.id &&
      ((object.result != null && object.error == null) ||
       (object.result == null && object.error != null))) {
    return new accountchooser.rpc.Response(object.id, object.result,
        object.error);
  } else {
    return null;
  }
};

/**
 * Returns the result of the Response.
 * @return {*} the result of the Response.
 */
accountchooser.rpc.Response.prototype.getResult = function() {
  return this.result_;
};

/**
 * Returns the error of the Response.
 * @return {Object|undefined} the error of the Response.
 */
accountchooser.rpc.Response.prototype.getError = function() {
  return this.error_;
};

/**
 * Returns the request id.
 * @return {string} the id of the request.
 */
accountchooser.rpc.Response.prototype.getId = function() {
  return this.id_;
};

/**
 * @override
 */
accountchooser.rpc.Response.prototype.toJSON = function() {
  var json = accountchooser.rpc.RpcObject.prototype.toJSON.call(this);
  json.id = this.id_;
  if (this.result_ != null) {
    json.result = this.result_;
  } else if (this.error_ != null) {
    json.error = this.error_;
  }
  return json;
};



/**
 * RequestAckNotification class, which is a Notification to indicate that a
 * Request is received.
 * @param {string} requestId The id of the Request.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.RequestAckNotification = function(requestId) {
  accountchooser.param.notEmpty(requestId, 'requestId');
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.RequestAckNotification.METHOD,
      {requestId: requestId});
};
accountchooser.rpc.RequestAckNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the RequestAckNotification */
accountchooser.rpc.RequestAckNotification.METHOD = 'requestAckNotification';

/**
 * Parses a plain object into a RequestAckNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.RequestAckNotification} A RequestAckNotification
 *     if possible.
 */
accountchooser.rpc.RequestAckNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.RequestAckNotification.METHOD &&
      object.params && object.params.requestId) {
    return new accountchooser.rpc.RequestAckNotification(
        object.params.requestId);
  } else {
    return null;
  }
};

/**
 * @return {string} The id of the Request to be acknowledged.
 */
accountchooser.rpc.RequestAckNotification.prototype.getRequestId = function() {
  return /** @type {string} */ (this.getParameter('requestId'));
};

/**
 * ServerReadyNotification class, which is a Notification to indicate that
 * accountchooser page is loaded and initialized.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.ServerReadyNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.ServerReadyNotification.METHOD);
};
accountchooser.rpc.ServerReadyNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the ServerReadyNotification */
accountchooser.rpc.ServerReadyNotification.METHOD = 'serverReadyNotification';

/**
 * Parses a plain object into a ServerReadyNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ServerReadyNotification} A
 *     ServerReadyNotification if possible.
 */
accountchooser.rpc.ServerReadyNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.ServerReadyNotification.METHOD) {
    return new accountchooser.rpc.ServerReadyNotification();
  } else {
    return null;
  }
};

/**
 * ClientReadyNotification class, which is a Notification to indicate that
 * the client page is loaded and initialized.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.ClientReadyNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.ClientReadyNotification.METHOD);
};
accountchooser.rpc.ClientReadyNotification.inheritsFrom(
   accountchooser.rpc.Notification);

/** The method name of the ClientReadyNotification */
accountchooser.rpc.ClientReadyNotification.METHOD = 'clientReadyNotification';

/**
 * Parses a plain object into a ClientReadyNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ClientReadyNotification} A
 *     ClientReadyNotification if possible.
 */
accountchooser.rpc.ClientReadyNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.ClientReadyNotification.METHOD) {
    return new accountchooser.rpc.ClientReadyNotification();
  } else {
    return null;
  }
};

/**
 * EmptyResponseNotification class, which is a Notification to indicate that
 * there's no saved Response for the client.
 * @constructor
 * @extends {accountchooser.rpc.Notification}
 */
accountchooser.rpc.EmptyResponseNotification = function() {
  accountchooser.rpc.Notification.call(this,
      accountchooser.rpc.EmptyResponseNotification.METHOD);
};
accountchooser.rpc.EmptyResponseNotification.inheritsFrom(
    accountchooser.rpc.Notification);

/** The method name of the EmptyResponseNotification */
accountchooser.rpc.EmptyResponseNotification.METHOD =
    'emptyResponseNotification';

/**
 * Parses a plain object into an EmptyResponseNotification.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.EmptyResponseNotification} An
 *     EmptyResponseNotification if possible.
 */
accountchooser.rpc.EmptyResponseNotification.parse = function(object) {
  if (object.method == accountchooser.rpc.EmptyResponseNotification.METHOD) {
    return new accountchooser.rpc.EmptyResponseNotification();
  } else {
    return null;
  }
};

/**
 * StoreRequest class, which requests to store some accounts in accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.AccountList} accounts the list of accounts to be
 *     stored.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.StoreRequest = function(id, accounts, clientConfig) {
  accountchooser.param.notEmptyArray(accounts, 'accounts');
  var params = {
    accounts: accounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.StoreRequest.METHOD, params);
};
accountchooser.rpc.StoreRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the StoreRequest */
accountchooser.rpc.StoreRequest.METHOD = 'store';

/**
 * Parses a plain object into a StoreRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.StoreRequest} A StoreRequest if possible.
 */
accountchooser.rpc.StoreRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.StoreRequest.METHOD &&
      object.id &&
      object.params &&
      accountchooser.util.isArray(object.params.accounts) &&
      object.params.accounts.length > 0) {
    return new accountchooser.rpc.StoreRequest(object.id,
        object.params.accounts, object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.AccountList} The accounts to be stored.
 */
accountchooser.rpc.StoreRequest.prototype.getAccounts = function() {
  var accounts =
      /** @type {accountchooser.AccountList} */ (this.getParameter('accounts'));
  return accounts;
};

/**
 * SelectRequest class, which requests to select an account from accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.AccountList} localAccounts the list of local accounts
 *     to be shown in accountchooser.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.SelectRequest = function(id, localAccounts, clientConfig) {
  var params = {
    localAccounts: localAccounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.SelectRequest.METHOD, params);
};
accountchooser.rpc.SelectRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the SelectRequest */
accountchooser.rpc.SelectRequest.METHOD = 'select';

/**
 * Parses a plain object into a SelectRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.SelectRequest} A SelectRequest if possible.
 */
accountchooser.rpc.SelectRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.SelectRequest.METHOD && object.id) {
    return new accountchooser.rpc.SelectRequest(object.id,
        object.params && object.params.localAccounts,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.AccountList} The local accounts.
 */
accountchooser.rpc.SelectRequest.prototype.getLocalAccounts = function() {
  var localAccounts =
      /** @type {accountchooser.AccountList} */
      (this.getParameter('localAccounts') || []);
  return localAccounts;
};

/**
 * UpdateRequest class, which requests to update an account in accountchooser.
 * @param {string} id the id of the Request.
 * @param {accountchooser.Account} account the account to be updated.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.UpdateRequest = function(id, account, clientConfig) {
  accountchooser.param.notEmpty(account, 'account');
  var params = {
    account: account,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.UpdateRequest.METHOD, params);
};
accountchooser.rpc.UpdateRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the UpdateRequest */
accountchooser.rpc.UpdateRequest.METHOD = 'update';

/**
 * Parses a plain object into an UpdateRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.UpdateRequest} An UpdateRequest if possible.
 */
accountchooser.rpc.UpdateRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.UpdateRequest.METHOD &&
      object.id && object.params && object.params.account) {
    return new accountchooser.rpc.UpdateRequest(object.id,
        object.params.account, object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.Account} The account to be updated.
 */
accountchooser.rpc.UpdateRequest.prototype.getAccount = function() {
  var account =
      /** @type {accountchooser.Account} */ (this.getParameter('account'));
  return account;
};

/**
 * ManageRequest class, which requests to show accountchooser manage page.
 * @param {string} id the id of the Request.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.ManageRequest = function(id, clientConfig) {
  var params = {clientConfig: clientConfig};
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.ManageRequest.METHOD, params);
};
accountchooser.rpc.ManageRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the ManageRequest */
accountchooser.rpc.ManageRequest.METHOD = 'manage';

/**
 * Parses a plain object into a ManageRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.ManageRequest} A ManageRequest if possible.
 */
accountchooser.rpc.ManageRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.ManageRequest.METHOD && object.id) {
    return new accountchooser.rpc.ManageRequest(object.id,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * AboutRequest class, which requests to show accountchooser about page.
 * @param {string} id the id of the Request.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.AboutRequest = function(id, clientConfig) {
  var params = {clientConfig: clientConfig};
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.AboutRequest.METHOD, params);
};
accountchooser.rpc.AboutRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the AboutRequest */
accountchooser.rpc.AboutRequest.METHOD = 'about';

/**
 * Parses a plain object into an AboutRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.AboutRequest} An AboutRequest if possible.
 */
accountchooser.rpc.AboutRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.AboutRequest.METHOD && object.id) {
    return new accountchooser.rpc.AboutRequest(object.id,
        object.params && object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * BootstrapRequest class, which requests to set the client to be the default
 * account bootstrapping domain.
 * @param {string} id the id of the Request.
 * @param {string} origin account bootstrapping domain to be set.
 * @param {accountchooser.AccountList} accounts the accounts to be stored.
 * @param {Object} clientConfig the configuration parameters of current client.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.BootstrapRequest = function(id, origin, accounts,
    clientConfig) {
  accountchooser.param.notEmpty(origin, 'origin');
  var params = {
    origin: origin,
    accounts: accounts,
    clientConfig: clientConfig
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.BootstrapRequest.METHOD, params);
};
accountchooser.rpc.BootstrapRequest.inheritsFrom(
    accountchooser.rpc.ClientRequest);

/** The method name of the BootstrapRequest */
accountchooser.rpc.BootstrapRequest.METHOD = 'bootstrap';

/**
 * Parses a plain object into a BootstrapRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.BootstrapRequest} A BootstrapRequest if possible.
 */
accountchooser.rpc.BootstrapRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.BootstrapRequest.METHOD &&
      object.id && object.params && object.params.origin) {
    return new accountchooser.rpc.BootstrapRequest(object.id,
        object.params.origin, object.params.accounts,
        object.params.clientConfig);
  } else {
    return null;
  }
};

/**
 * @return {string} The origin of the client.
 */
accountchooser.rpc.BootstrapRequest.prototype.getOrigin = function() {
  return /** @type {string} */ (this.getParameter('origin'));
};

/**
 * @return {accountchooser.AccountList} The accounts to be stored.
 */
accountchooser.rpc.BootstrapRequest.prototype.getAccounts = function() {
  var accounts =
      /** @type {accountchooser.AccountList} */
      (this.getParameter('accounts') || []);
  return accounts;
};

/**
 * QueryRequest class, which represents a query from the client.
 * @param {string} id the id of the Request.
 * @param {accountchooser.rpc.Queries} query the inquiry from the client.
 * @param {?accountchooser.Account} account the account associated with this
 *     query.
 * @constructor
 * @extends {accountchooser.rpc.ClientRequest}
 */
accountchooser.rpc.QueryRequest = function(id, query, account) {
  accountchooser.param.notEmpty(query, 'query');
  var params = {
    query: query,
    account: account
  };
  accountchooser.rpc.ClientRequest.call(this, id,
      accountchooser.rpc.QueryRequest.METHOD, params);
};
accountchooser.rpc.QueryRequest.inheritsFrom(accountchooser.rpc.ClientRequest);

/** The method name of the QueryRequest */
accountchooser.rpc.QueryRequest.METHOD = 'query';

/**
 * Parses a plain object into a QueryRequest.
 * @param {Object} object The plain object.
 * @return {accountchooser.rpc.QueryRequest} A QueryRequest if possible.
 */
accountchooser.rpc.QueryRequest.parse = function(object) {
  if (object.method == accountchooser.rpc.QueryRequest.METHOD &&
      object.id && object.params && object.params.query) {
    return new accountchooser.rpc.QueryRequest(object.id,
        object.params.query, object.params.account);
  } else {
    return null;
  }
};

/**
 * @return {accountchooser.rpc.Queries} The query of the request.
 */
accountchooser.rpc.QueryRequest.prototype.getQuery = function() {
  return /** @type {accountchooser.rpc.Queries} */ (this.getParameter('query'));
};

/**
 * @return {?accountchooser.Account} The account to be inquiried.
 */
accountchooser.rpc.QueryRequest.prototype.getAccount = function() {
  var account =
      /** @type {?accountchooser.Account} */ (this.getParameter('account'));
  return account;
};

/**
 * Enums for accountchooser queries.
 * @enum {string}
 */
accountchooser.rpc.Queries = {
  AC_DISABLED: 'acDisabled',
  AC_EMPTY: 'acEmpty',
  ACCOUNT_EXIST: 'accountExist',
  SHOULD_UPDATE: 'shouldUpdate'
};


/**
 * Parses a JavaScript object into a RpcObject.
 * @param {Object} jsonObject A RPC object in plain JavaScript .
 * @param {Array.<Function>} acceptable A list of acceptable RpcObject classes.
 * @return {accountchooser.rpc.RpcObject} A valid RpcObject, of null otherwise.
 */
accountchooser.rpc.parseRpcObject = function(jsonObject, acceptable) {
  accountchooser.param.notEmpty(jsonObject, 'jsonObject');
  accountchooser.param.notEmptyArray(acceptable, 'acceptable');

  if (!jsonObject || jsonObject.jsonrpc != '2.0') {
    accountchooser.util.log('"jsonrpc" field should be "2.0".');
    return null;
  }

  var result = null;
  var acceptResponse =
      accountchooser.util.indexOf(accountchooser.rpc.Response, acceptable) > -1;
  if (jsonObject.method) {
    // It should be a Request.
    for (var i = 0; i < acceptable.length; i++) {
      if (jsonObject.method == acceptable[i].METHOD) {
        var parse =
            /** @type {function(Object): accountchooser.rpc.RpcObject} */
            (acceptable[i].parse);
        result = parse(jsonObject);
        break;
      }
    }
  } else if (acceptResponse) {
    // No method field, it should be a Response.
    result = accountchooser.rpc.Response.parse(jsonObject);
  }

  if (!result) {
    accountchooser.util.log('Unrecoginzied JSON-RPC object.');
    return null;
  }

  return result;
};


/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for StoreRequest.
 */
accountchooser.rpc.getStoreRequestValidator = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('silent', accountchooser.util.V_BOOLEAN).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('accounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for SelectRequest.
 */
accountchooser.rpc.getSelectRequestValidator = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var uiValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('title', new accountchooser.util.TextValidator(64, true)).
      addOptional('favicon', urlValidator).
      addOptional('branding', urlValidator);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('providers', accountchooser.util.V_PROVIDER_LIST).
      addOptional('showAll', accountchooser.util.V_BOOLEAN).
      addOptional('ui', uiValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('localAccounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for UpdateRequest.
 */
accountchooser.rpc.getUpdateRequestValidator = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('account', accountchooser.util.V_ACCOUNT).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @param {string} origin The origin of the client.
 * @return {accountchooser.util.Validator} A validator for BootstrapRequest.
 */
accountchooser.rpc.getBootstrapRequestValidator = function(origin) {
  var urlValidator = new accountchooser.util.UrlValidator(2048, origin);
  var clientConfigValidator = new accountchooser.util.ObjectValidator(false).
      addOptional('clientCallbackUrl', urlValidator).
      addOptional('positiveCallbackUrl', urlValidator).
      addOptional('negativeCallbackUrl', urlValidator).
      addOptional('keepPopup', accountchooser.util.V_BOOLEAN).
      addOptional('language', accountchooser.util.V_LANGUAGE);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('origin', urlValidator).
      addOptional('accounts', accountchooser.util.V_ACCOUNT_LIST).
      addRequired('clientConfig', clientConfigValidator);
  return paramsValidator;
};

/**
 * @return {accountchooser.util.Validator} A validator for QueryRequest.
 */
accountchooser.rpc.getQueryRequestValidator = function() {
  var queryValidator =
      new accountchooser.util.EnumValidator(accountchooser.rpc.Queries);
  var paramsValidator = new accountchooser.util.ObjectValidator(false).
      addRequired('query', queryValidator).
      addOptional('account', accountchooser.util.V_ACCOUNT);
  return paramsValidator;
};

/**
 * Validates a request sent from the client.
 * @param {accountchooser.rpc.ClientRequest} request The request sent from the
 *     client.
 * @param {string} origin The origin of the client.
 */
accountchooser.rpc.validateRequest = function(request, origin) {
  var validator;
  if (request instanceof accountchooser.rpc.StoreRequest) {
    validator = accountchooser.rpc.getStoreRequestValidator(origin);
  } else if (request instanceof accountchooser.rpc.SelectRequest) {
    validator = accountchooser.rpc.getSelectRequestValidator(origin);
  } else if (request instanceof accountchooser.rpc.UpdateRequest) {
    validator = accountchooser.rpc.getUpdateRequestValidator(origin);
  } else if (request instanceof accountchooser.rpc.BootstrapRequest) {
    validator = accountchooser.rpc.getBootstrapRequestValidator(origin);
  } else if (request instanceof accountchooser.rpc.QueryRequest) {
    validator = accountchooser.rpc.getQueryRequestValidator();
  } else {
    // For all other requests: ManageRequest, AboutRequest.
    validator = new accountchooser.util.ObjectValidator(false);
  }
  request.validate(validator);
};



/**
 * Calls an RPC service registered in another window.
 * @param {Window} targetWindow The target window object.
 * @param {accountchooser.rpc.RpcObject|Object} object The RpcObject or its
 *     serializable plain object counterpart.
 * @param {string=} opt_domain The domain of the target window.
 */
accountchooser.rpc.call = function(targetWindow, object, opt_domain) {
  accountchooser.param.notEmpty(targetWindow, 'targetWindow');
  var json;
  if (object instanceof accountchooser.rpc.RpcObject) {
    json = object.toString();
  } else {
    json = JSON.stringify(object);
  }
  accountchooser.util.log('Send message: ' + json);
  targetWindow.postMessage(json, opt_domain || '*');
};

/**
 * Registers the message handler for postMessage.
 * @param {function(Event, ...)} messageHandler The message handler for
 *     postMessage.
 */
accountchooser.rpc.registerMessageHandler = function(messageHandler) {
  if (window.addEventListener) {
    window.addEventListener('message', messageHandler, false);
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', messageHandler);
  } else if (window.document.attachEvent) {
    window.document.attachEvent('onmessage', messageHandler);
  } else {
    throw 'Register handler for postMessage failed.';
  }
};

/**
 * A wrapper for window.location.replace(), to be easily mocked in unit tests.
 * @param {string} url The target URL.
 */
accountchooser.rpc.redirectWindowTo = function(url) {
  window.location.assign(url);
};

/**
 * A wrapper for window.close(), to be easily mocked in unit tests.
 */
accountchooser.rpc.closeWindow = function() {
  window.close();
};



/**
 * Gets the width of the window.
 * Try to use jQuery().width if possible.
 * @param {Window} window The window element.
 * @return {number} The width of the window.
 * @private
 */
accountchooser.util.windowWidth_ = function(window) {
  if (typeof jQuery !== 'undefined') {
    return /** @type {number} */ (jQuery(window).width());
  }
  var width = 0;
  if (window.innerWidth) {
    width = window.innerWidth;
  } else if (window.document && window.document.documentElement &&
      window.document.documentElement.clientWidth) {
    width = window.document.documentElement.clientWidth;
  } else if (window.document && window.document.body &&
      window.document.body.clientWidth) {
    width = window.document.body.clientWidth;
  }
  return width;
};

/**
 * Gets the height of the window.
 * Try to use jQuery().height if possible.
 * @param {Window} window The window element.
 * @return {number} The height of the window.
 * @private
 */
accountchooser.util.windowHeight_ = function(window) {
  if (typeof jQuery !== 'undefined') {
    return /** @type {number} */ (jQuery(window).height());
  }
  var height = 0;
  if (window.innerHeight) {
    height = window.innerHeight;
  } else if (window.document && window.document.documentElement &&
      window.document.documentElement.clientHeight) {
    height = window.document.documentElement.clientHeight;
  } else if (window.document && window.document.body &&
      window.document.body.clientHeight) {
    height = window.document.body.clientHeight;
  }
  return height;
};

/**
 * Opens a new window.
 * @param {number} width The width of the window.
 * @param {number} height The height of the window.
 * @param {string=} opt_url The URL for the new window.
 * @param {string=} opt_name The name for the new window.
 * @return {Window} the opened window object.
 */
accountchooser.util.showPopup = function(width, height, opt_url, opt_name) {
  var top = (accountchooser.util.windowHeight_(window) - height) / 2;
  var left = (accountchooser.util.windowWidth_(window) - width) / 2;
  top = top > 0 ? top : 0;
  left = left > 0 ? left : 0;
  var options = 'width=' + width + ',height=' + height + ',left=' + left +
      ',top=' + top + ',status=1,location=1,resizable=yes,menubar=no,' +
      'toolbar=no,titlebar=no,channelmode=no,directories=no,fullscreen=no';
  var url = opt_url || 'about:blank';
  var popup = window.open(url, opt_name, options);
  if (popup) {
    popup.focus();
  }
  return popup;
};



/**
 * Default accountchooser domain.
 * @const {string}
 */
accountchooser.rpc.DEFAULT_AC_DOMAIN = 'https://www.accountchooser.com';

/**
 * Default accountchooser iframe URL.
 * @const {string}
 */
accountchooser.rpc.DEFAULT_AC_IFRAME_PATH = '/iframe.html';

/**
 * Default accountchooser popup URL.
 * @const {string}
 */
accountchooser.rpc.DEFAULT_AC_POPUP_PATH = '/popup.html';

/**
 * Default accountchooser redirect URL.
 * @const {string}
 */
accountchooser.rpc.DEFAULT_AC_REDIRECT_PATH = '/redirect.html';

/**
 * Default popup width.
 * @const {number}
 */
accountchooser.rpc.DEFAULT_POPUP_WIDTH = 520;

/**
 * Default popup height.
 * @const {number}
 */
accountchooser.rpc.DEFAULT_POPUP_HEIGHT = 550;

/**
 * Default popup window name.
 * @const {string}
 */
accountchooser.rpc.DEFAULT_POPUP_NAME = 'acPopup';

/**
 * Callback name for empty response.
 * @const {string}
 */
accountchooser.rpc.EMPTY_RESPONSE_CALLBACK = 'empty';

/**
 * @typedef {{
 *   domain: string,
 *   iframe: string,
 *   popup: string,
 *   redirect: string
 * }}
 */
accountchooser.rpc.ServerSpec;

/**
 * The status of the client.
 * @struct
 * @private
 */
accountchooser.rpc.client_ = {
  /** @type {boolean} */
  popupMode: false,
  /** @type {Window} */
  popupWindow: null,
  /** @type {number} */
  popupWidth: accountchooser.rpc.DEFAULT_POPUP_WIDTH,
  /** @type {number} */
  popupHeight: accountchooser.rpc.DEFAULT_POPUP_HEIGHT,
  /** @type {?accountchooser.rpc.ServerSpec} */
  serverSpec: null,
  /** @type {Element} */
  iframe: null,
  /** @type {boolean} */
  iframeLoaded: false,
  /** @type {boolean} */
  serverReady: false,
  /** @type {Array.<accountchooser.rpc.ClientRequest>} */
  queue: [],
  /** @type {?function(accountchooser.rpc.RpcObject)} */
  rpcHandler: null
};

/**
 * Sets the popup mode.
 * @param {boolean} popupMode The value for popup mode.
 */
accountchooser.rpc.setPopupMode = function(popupMode) {
  accountchooser.rpc.client_.popupMode = popupMode;
  if (popupMode) {
    accountchooser.rpc.removeIFrame_();
  } else {
    accountchooser.rpc.initIFrame_();
  }
};

/**
 * Gets the popup mode.
 * @return {boolean} The value for popup mode.
 */
accountchooser.rpc.getPopupMode = function() {
  return accountchooser.rpc.client_.popupMode;
};

/**
 * Sets the popup window.
 * @param {Window} popupWindow The popup window.
 */
accountchooser.rpc.setPopupWindow = function(popupWindow) {
  accountchooser.rpc.client_.popupWindow = popupWindow;
};

/**
 * Gets the popup window.
 * @return {Window} The popup window.
 */
accountchooser.rpc.getPopupWindow = function() {
  return accountchooser.rpc.client_.popupWindow;
};

/**
 * Closes the popup window if it is not closed.
 */
accountchooser.rpc.closePopupWindow = function() {
  if (accountchooser.rpc.client_.popupWindow &&
      !accountchooser.rpc.client_.popupWindow.closed) {
    accountchooser.rpc.client_.popupWindow.close();
  }
  accountchooser.rpc.client_.popupWindow = null;
};

/**
 * Opens a popup window and set the URL to accountchooser or reuses the
 * existing one.
 * @private
 */
accountchooser.rpc.openPopupWindow_ = function() {
  accountchooser.rpc.client_.serverReady = false;
  var popupWindow = accountchooser.rpc.client_.popupWindow;
  if (!popupWindow || popupWindow.closed) {
    popupWindow = accountchooser.util.showPopup(
        accountchooser.rpc.client_.popupWidth,
        accountchooser.rpc.client_.popupHeight,
        accountchooser.rpc.client_.serverSpec.popup);
  } else {
    popupWindow.focus();
    popupWindow.window.location.assign(
        accountchooser.rpc.client_.serverSpec.popup);
  }
  accountchooser.rpc.client_.popupWindow = popupWindow;
};

/**
 * Valid RpcObject types for client side.
 * @type {Array.<Function>}
 * @const
 * @private
 */
accountchooser.rpc.VALID_RPC_TYPES_ = [
  accountchooser.rpc.RequestAckNotification,
  accountchooser.rpc.ServerReadyNotification,
  accountchooser.rpc.EmptyResponseNotification,
  accountchooser.rpc.Response
];

/**
 * Handler for postMessage event.
 * @param {Event} e the message event object.
 * @private
 */
accountchooser.rpc.process_ = function(e) {
  accountchooser.util.log('Received message: ' + e.data + ' from ' + e.origin);
  if (e.origin !== accountchooser.rpc.client_.serverSpec.domain) {
    return;
  }
  try {
     var jsonObject = /** @type {Object} */ (JSON.parse(e.data));
  } catch (ex) {
    accountchooser.util.log('Invalid JSON object.');
    return;
  }
  var rpcObject = accountchooser.rpc.parseRpcObject(jsonObject,
      accountchooser.rpc.VALID_RPC_TYPES_);
  if (!rpcObject) {
    accountchooser.util.log('Unrecognized rpc received: ' + e.data);
  } else if (rpcObject instanceof accountchooser.rpc.ServerReadyNotification) {
    accountchooser.rpc.onServerReady_();
  } else if (rpcObject instanceof accountchooser.rpc.RequestAckNotification) {
    accountchooser.rpc.onRequestAck_();
  } else {
    accountchooser.rpc.client_.rpcHandler(rpcObject);
  }
};

/**
 * Sends the RPC objects in the waiting queue. It is called when the iframe is
 * loaded (in redirect mode), or when the ServerReadyNotification is received
 * (in popup mode).
 * @param {Window} targetWindow The target window to send RPC.
 * @private
 */
accountchooser.rpc.sendRpcInQueue_ = function(targetWindow) {
  var queue = accountchooser.rpc.client_.queue;
  if (queue && queue.length) {
    for (var i = 0; i < queue.length; i++) {
      accountchooser.rpc.call(targetWindow, queue[i]);
    }
    accountchooser.rpc.client_.queue = [];
  }
};

/**
 * Removes the hidden iframe if it exists.
 * @private
 */
accountchooser.rpc.removeIFrame_ = function() {
  var iframe = accountchooser.rpc.client_.iframe;
  if (iframe) {
    iframe.parentNode.removeChild(iframe);
    accountchooser.rpc.client_.iframe = null;
  }
};

/**
 * Initializes the accountchooser iframe.
 * @private
 */
accountchooser.rpc.initIFrame_ = function() {
  if (!accountchooser.rpc.client_.iframe) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'position: absolute; width: 1px; ' +
        'height: 1px; left: -9999px;');
    iframe.setAttribute('id', 'accountchooser-iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    document.body.appendChild(iframe);
    accountchooser.rpc.client_.iframe = iframe;
    if (window.addEventListener) {
      iframe.addEventListener('load', accountchooser.rpc.iframeOnLoad_, false);
    } else if (window.attachEvent) {
      iframe.attachEvent('onload', accountchooser.rpc.iframeOnLoad_);
    } else if (window.document.attachEvent) {
      window.document.attachEvent('onload', accountchooser.rpc.iframeOnLoad_);
    } else {
      accountchooser.util.log('Failed to add iframe onload event.');
    }
    iframe.setAttribute('src', accountchooser.rpc.client_.serverSpec.iframe);
  }
};

/**
 * OnLoad handler for accountchooser iframe.
 * @private
 */
accountchooser.rpc.iframeOnLoad_ = function() {
  accountchooser.rpc.client_.iframeLoaded = true;
  if (!accountchooser.rpc.client_.popupMode) {
    //Sends notification to the iframe to trigger saved RPCs.
    var w = accountchooser.rpc.client_.iframe.contentWindow;
    accountchooser.rpc.call(w,
        new accountchooser.rpc.ClientReadyNotification());
    accountchooser.rpc.sendRpcInQueue_(w);
  }
};

/**
 * Handler for ServerReadyNotification.
 * @private
 */
accountchooser.rpc.onServerReady_ = function() {
  if (accountchooser.rpc.client_.popupMode) {
    accountchooser.rpc.client_.serverReady = true;
    accountchooser.rpc.sendRpcInQueue_(accountchooser.rpc.client_.popupWindow);
  }
};

/**
 * Handler for RequestAckNotification. It simply redirects to accountchooser.
 * @private
 */
accountchooser.rpc.onRequestAck_ = function() {
  if (!accountchooser.rpc.client_.popupMode) {
    var url = accountchooser.rpc.client_.serverSpec.redirect + '#' +
        window.location.host;
    window.location.assign(url);
  }
};

/**
 * @typedef {{
 *   rpcHandler: function(accountchooser.rpc.RpcObject),
 *   serverSpec: accountchooser.rpc.ServerSpec,
 *   popupMode: (?boolean|undefined),
 *   popupWindow: (Window|undefined),
 *   popupWidth: (?number|undefined),
 *   popupHeight: (?number|undefined)
 * }}
 */
accountchooser.rpc.RpcClientOptions;

/**
 * Initializes the client with the given configuration parameters.
 * @param {accountchooser.rpc.RpcClientOptions} options Configuration parameters
 *     of the client.
 */
accountchooser.rpc.initClient = function(options) {
  accountchooser.param.notEmptyFunction(options.rpcHandler,
      'options.rpcHandler');
  accountchooser.rpc.client_.rpcHandler = options.rpcHandler;

  accountchooser.param.notEmpty(options.serverSpec, 'options.serverSpec');
  accountchooser.param.notEmpty(options.serverSpec.domain,
      'options.serverSpec.domain');
  accountchooser.param.notEmpty(options.serverSpec.iframe,
      'options.serverSpec.iframe');
  accountchooser.param.notEmpty(options.serverSpec.popup,
      'options.serverSpec.popup');
  accountchooser.param.notEmpty(options.serverSpec.redirect,
      'options.serverSpec.redirect');
  // Build the absolute URL for iframe/popup/redirect page.
  var serverSpec = options.serverSpec;
  serverSpec.iframe = serverSpec.domain + serverSpec.iframe;
  serverSpec.popup = serverSpec.domain + serverSpec.popup;
  serverSpec.redirect = serverSpec.domain + serverSpec.redirect;
  accountchooser.rpc.client_.serverSpec = serverSpec;

  accountchooser.rpc.registerMessageHandler(accountchooser.rpc.process_);
  accountchooser.rpc.setPopupMode(!!options.popupMode);
  if (options.popupWindow) {
    accountchooser.rpc.setPopupWindow(options.popupWindow);
  }
  if (options.popupWidth) {
    accountchooser.rpc.client_.popupWidth = options.popupWidth;
  }
  if (options.popupHeight) {
    accountchooser.rpc.client_.popupHeight = options.popupHeight;
  }
};

/**
 * Sends an RPC object to server.
 * @param {accountchooser.rpc.ClientRequest} request The RPC request object.
 */
accountchooser.rpc.callServer = function(request) {
  // Validate the request.
  accountchooser.rpc.validateRequest(request, window.location.host);

  if (!accountchooser.rpc.client_.popupMode) {
    // Redirect mode, use iframe as relay.
    if (!accountchooser.rpc.client_.iframeLoaded) {
      accountchooser.rpc.client_.queue.push(request);
    } else {
      var targetWindow = accountchooser.rpc.client_.iframe.contentWindow;
      accountchooser.rpc.call(targetWindow, request);
    }
  } else {
    // Check if the request is QueryRequest. Since we don't have iframe in popup
    // mode, there's no way to inquiry. Just return an error.
    if (request instanceof accountchooser.rpc.QueryRequest) {
      var error = {
        code: -32601,
        message: 'Method not found',
        data: 'Query request is not supported in popup mode.'
      };
      accountchooser.rpc.client_.rpcHandler(
          new accountchooser.rpc.Response(request.getId(), undefined, error));
      return;
    }
    // Popup mode, call server directly.
    accountchooser.rpc.openPopupWindow_();
    if (!accountchooser.rpc.client_.serverReady) {
      accountchooser.rpc.client_.queue.push(request);
    } else {
      var targetWindow = accountchooser.rpc.client_.popupWindow;
      accountchooser.rpc.call(targetWindow, request);
    }
  }
};



/**
 * @typedef {{
 *   popupMode: (?boolean|undefined),
 *   popupWindow: (Window|undefined),
 *   popupWidth: (?number|undefined),
 *   popupHeight: (?number|undefined),
 *   serverSpec: (?accountchooser.rpc.ServerSpec|undefined),
 *   callbacks: Object.<string, function(?=, Object=)>,
 *   keepPopup: (?boolean|undefined),
 *   showAll: (?boolean|undefined),
 *   clientCallbackUrl: (?string|undefined),
 *   positiveCallbackUrl: (?string|undefined),
 *   negativeCallbackUrl: (?string|undefined),
 *   providers: (?accountchooser.IdpList|undefined),
 *   ui: (?accountchooser.CustomUiOptions|undefined),
 *   language: (?string|undefined)
 * }}
 */
accountchooser.ApiConfig;

/**
 * API wrapper class.
 * @param {accountchooser.ApiConfig} config The configuration for all APIs.
 * @constructor
 */
accountchooser.Api = function(config) {
  accountchooser.param.notEmpty(config, 'config');
  // Merge customized configuration with the default.
  var defaultConfig = {
    serverSpec: {
      domain: accountchooser.rpc.DEFAULT_AC_DOMAIN,
      iframe: accountchooser.rpc.DEFAULT_AC_IFRAME_PATH,
      popup: accountchooser.rpc.DEFAULT_AC_POPUP_PATH,
      redirect: accountchooser.rpc.DEFAULT_AC_REDIRECT_PATH
    },
    popupWidth: accountchooser.rpc.DEFAULT_POPUP_WIDTH,
    popupHeight: accountchooser.rpc.DEFAULT_POPUP_HEIGHT,
    clientCallbackUrl: window.location.href
  };
  config =
      /** @type {accountchooser.ApiConfig} */
      (accountchooser.util.extend(true, {}, defaultConfig, config));
  this.config_ = config;
  this.clientConfig_ = {
    clientCallbackUrl: this.config_.clientCallbackUrl,
    positiveCallbackUrl: this.config_.positiveCallbackUrl,
    negativeCallbackUrl: this.config_.negativeCallbackUrl,
    keepPopup: !!this.config_.keepPopup,
    showAll: !!this.config_.showAll,
    providers: this.config_.providers,
    language: this.config_.language,
    ui: this.config_.ui
  };
};

/**
 * Constructs an Api object, and initializes it before return.
 * All configurations are listed below with explanation.
 * <pre>
 * {
 *   popupMode: true/false,  // Default is false, that is, redirect mode.
 *   popupWindow: popup,     // Popup window object. Used in popup mode.
 *   popupWidth: 520,        // Optional width for the popup window.
 *   popupHeight: 550,       // Optional height for the popup window.
 *   serverSpec: {           // Optional accountchooser server config.
 *     domain: '',           // accountchooser domain, including scheme.
 *     iframe: '',           // Path for iframe page. e.g., '/iframe.html'
 *     popup: '',            // Path for popup page. e.g., '/popup.html'
 *     redirect: ''          // Path for redirect page. e.g., '/redirect.html'
 *   },
 *   callbacks: {            // A set of callback functions.
 *     empty: func,          // Callback for no response from accountchooser.
 *     select: func,         // Callback for selecting account response.
 *     store: func,          // Callback for storing accounts resposne.
 *     update: func,         // Callback for updating account response.
 *   },
 *   clientCallbackUrl: '',  // URL returned from accountchooser in redirect
 *                           // mode. Default is the current page Url.
 *   positiveCallbackUrl: '',// If specified and user performs positive action,
 *                           // such as confirm adding/updating account, this
 *                           // one is used instead of clientCallbackUrl and no
 *                           // callback function is needed.
 *   negativeCallbackUrl: '',// If specified and user performs negative action,
 *                           // such as cancel adding/updating account, this
 *                           // one is used instead of clientCallbackUrl and no
 *                           // callback function is needed.
 *   keepPopup: true/false,  // Used in popup mode. Default is false, that is,
 *                           // the popup window will be closed automatically.
 *   showAll: true/false,    // Default is false, that is, accountchooser will
 *                           // only show accounts with an email.
 *   providers: [],          // List for supported IDPs.
 *   ui: {                   // Customized UI settings.
 *     favicon: '',          // URL of the favicon.
 *     title: '',            // The window title.
 *     branding: ''          // URL of the branding content.
 *   },
 * }
 * </pre>
 * For callbacks, all should take two optional parameters. The first is the
 * result and the second is the error information. On success, the result is
 * present and the error is {@code undefined}; On failure, the result is
 * {@code undefined} ant the error is an JSON-RPC 2.0 error object. See
 * http://www.jsonrpc.org/specification#error_object for more information.
 * For providers, if it's {@code undefined}, or {@code null}, or an empty
 * array, the returned account will not have "providerId" field. Otherwise,
 * if it has a "providerId" field, the value must be one of the providers.
 * For ui.branding, the URL represents the resource that will be shown on
 * accountchooser as the branding material. It should have the correct CORS
 * headers set.
 * @param {accountchooser.ApiConfig} config The configuration for all APIs.
 * @return {accountchooser.Api} The created Api object.
 */
accountchooser.Api.init = function(config) {
  var api = new accountchooser.Api(config);
  return api.init_();
};

/**
 * Initializes the Api object with the configuration.
 * @return {accountchooser.Api} The Api object itself.
 * @private
 */
accountchooser.Api.prototype.init_ = function() {
  this.registerListeners_(this.config_.callbacks);
  accountchooser.rpc.initClient({
    popupMode: this.config_.popupMode,
    popupWindow: this.config_.popupWindow,
    popupWidth: this.config_.popupWidth,
    popupHeight: this.config_.popupHeight,
    serverSpec:
      /** @type {accountchooser.rpc.ServerSpec} */ (this.config_.serverSpec),
    rpcHandler: accountchooser.event.fireResponseEvent
  });
  return this;
};

/**
 * Sets the popup window.
 * @param {Window} popupWindow The popup window object.
 */
accountchooser.Api.prototype.setPopupWindow = function(popupWindow) {
  accountchooser.rpc.setPopupWindow(popupWindow);
};

/**
 * Gets the popup window.
 * @return {Window} popupWindow The popup window object.
 */
accountchooser.Api.prototype.getPopupWindow = function() {
  return accountchooser.rpc.getPopupWindow();
};

/**
 * Closes the popup window if it is not closed.
 */
accountchooser.Api.prototype.closePopupWindow = function() {
  accountchooser.rpc.closePopupWindow();
};

/**
 * Switches between popup and redirect modes.
 * @param {boolean} popupMode The new popupMode value.
 */
accountchooser.Api.prototype.changePopupModeTo = function(popupMode) {
  this.config_.popupMode = popupMode;
  accountchooser.rpc.setPopupMode(popupMode);
};

/**
 * Adds listeners.
 * @param {Object.<string, function(?=, Object=)>} callbacks The callbacks
 *     object, with the property name is the method name and the property value
 *     is the callback function.
 * @private
 */
accountchooser.Api.prototype.registerListeners_ = function(callbacks) {
  if (callbacks) {
    for (var service in callbacks) {
      var callback = callbacks[service];
      if (callback) {
        accountchooser.param.notEmptyFunction(callback,
            'callbacks.' + service);
        var event;
        if (service == accountchooser.rpc.EMPTY_RESPONSE_CALLBACK) {
          event = accountchooser.event.EventType.EMPTY_RESPONSE;
        } else {
          event = accountchooser.event.EventType.DONE;
        }
        var cb = this.wrapCallback_(callback);
        accountchooser.event.addResponseListener(cb, event, false, service);
      }
    }
  }
};

/**
 * Creates a wrapper callback which translates the Response into a pair of
 * result and error so that the caller would not be aware of the underlying
 * Response object.
 * @param {function(?=, Object=)} callback The real callback function provided
 *     by the caller.
 * @return {function(accountchooser.rpc.RpcObject)} The callback wrapper.
 * @private
 */
accountchooser.Api.prototype.wrapCallback_ = function(callback) {
  var cb = function(response) {
    if (response instanceof accountchooser.rpc.Response) {
      callback(response.getResult(), response.getError());
    } else {
      // If the callback is for EmptyResponseNotification, there's no Response.
      // The callback is called without any arguments.
      callback();
    }
  };
  return cb;
};

/**
 * Merges the client configurations with the global ones.
 * @param {Object=} opt_clientConfig The optional client configurations.
 * @return {Object} The merged client configurations.
 * @private
 */
accountchooser.Api.prototype.mergeClientConfig_ = function(opt_clientConfig) {
  if (opt_clientConfig) {
    return accountchooser.util.extend(false, {}, this.clientConfig_,
        opt_clientConfig);
  } else {
    return this.clientConfig_;
  }
};

/**
 * Starts the store service on accountchooser.
 * The accepted client configurations are list below:
 * <pre>
 * {
 *   clientCallbackUrl: '',  // See accountchooser.Api.init
 *   positiveCallbackUrl: '',// See accountchooser.Api.init
 *   negativeCallbackUrl: '',// See accountchooser.Api.init
 *   keepPopup: true/false,  // See accountchooser.Api.init
 *   language: '',           // See accountchooser.Api.init
 *   silent: true/false,     // Whether or not to add the accounts silently.
 *                           // Only allowed for account bootstrapping domain.
 * }
 * </pre>
 * If any of them is unspecified, the value is derived from the global
 * configurations (set by accountchooser.Api.init). Otherwise, it overwrites the
 * global one.
 * @param {accountchooser.AccountList} accounts The accounts to be stored.
 * @param {Object=} opt_clientConfig The optional client configurations.
 */
accountchooser.Api.prototype.store = function(accounts, opt_clientConfig) {
  accountchooser.param.notEmptyArray(accounts, 'accounts');
  var service = 'store';
  var clientConfig = this.mergeClientConfig_(opt_clientConfig);
  var store = new accountchooser.rpc.StoreRequest(
      service, accounts, clientConfig);
  accountchooser.rpc.callServer(store);
};

/**
 * Starts the select service on accountchooser.
 * The accepted client configurations are list below:
 * <pre>
 * {
 *   clientCallbackUrl: '',  // See accountchooser.Api.init
 *   keepPopup: true/false,  // See accountchooser.Api.init
 *   showAll: true/false,    // See accountchooser.Api.init
 *   providers: [],          // See accountchooser.Api.init
 *   language: '',           // See accountchooser.Api.init
 *   ui: {                   // See accountchooser.Api.init
 *     title: '',
 *     favicon: '',
 *     branding: ''
 *   }
 * }
 * </pre>
 * If any of them is unspecified, the value is derived from the global
 * configurations (set by accountchooser.Api.init). Otherwise, it overwrites the
 * global one.
 * @param {accountchooser.AccountList} localAccounts The local accounts list,
 *     which will be shown to the user for selecting.
 * @param {Object=} opt_clientConfig The optional client configurations.
 */
accountchooser.Api.prototype.select = function(localAccounts,
    opt_clientConfig) {
  var service = 'select';
  var clientConfig = this.mergeClientConfig_(opt_clientConfig);
  var select = new accountchooser.rpc.SelectRequest(
      service, localAccounts, clientConfig);
  accountchooser.rpc.callServer(select);
};

/**
 * Starts the update service on accountchooser.
 * The accepted client configurations are list below:
 * <pre>
 * {
 *   clientCallbackUrl: '',  // See accountchooser.Api.init
 *   positiveCallbackUrl: '',// See accountchooser.Api.init
 *   negativeCallbackUrl: '',// See accountchooser.Api.init
 *   keepPopup: true/false,  // See accountchooser.Api.init
 *   language: '',           // See accountchooser.Api.init
 * }
 * </pre>
 * If any of them is unspecified, the value is derived from the global
 * configurations (set by accountchooser.Api.init). Otherwise, it overwrites the
 * global one.
 * @param {accountchooser.Account} account The account to be updated.
 * @param {Object=} opt_clientConfig The optional client configurations.
 */
accountchooser.Api.prototype.update = function(account, opt_clientConfig) {
  accountchooser.param.notEmpty(account, 'account');
  var service = 'update';
  var clientConfig = this.mergeClientConfig_(opt_clientConfig);
  var update = new accountchooser.rpc.UpdateRequest(
      service, account, clientConfig);
  accountchooser.rpc.callServer(update);
};

/**
 * Sends the query to accountchooser to get the result.
 * @param {accountchooser.rpc.Queries} query The query sent to accountchooser.
 * @param {?accountchooser.Account} account The account associated with this
 *     query.
 * @param {function(boolean=, Object=)} callback The callback function which is
 *     called to pass the result response.
 * @private
 */
accountchooser.Api.prototype.query_ = function(query, account, callback) {
  accountchooser.param.notEmpty(query, 'query');
  accountchooser.param.notEmptyFunction(callback, 'callback');
  var service = 'query_' + query + '_' + new Date().getTime();
  var cb = this.wrapCallback_(callback);
  accountchooser.event.addResponseListener(cb,
      accountchooser.event.EventType.DONE, true, service);
  var request = new accountchooser.rpc.QueryRequest(service, query, account);
  accountchooser.rpc.callServer(request);
};

/**
 * Checks whether the accountchooser is disabled or not.
 * @param {function(boolean=, Object=)} callback The callback function which is
 *     called to pass the result or error. The first parameter is the checking
 *     result and the second is the error if it occurs.
 */
accountchooser.Api.prototype.checkDisabled = function(callback) {
  this.query_(accountchooser.rpc.Queries.AC_DISABLED, null, callback);
};

/**
 * Alias for checkDisabled.
 * @deprecated The API is renamed. The old one is kept only for backward
 *    compatibility and will be removed soon.
 */
accountchooser.Api.prototype.checkCdsDisabled =
    accountchooser.Api.prototype.checkDisabled;

/**
 * Checks whether the accountchooser is empty.
 * @param {function(boolean=, Object=)} callback The callback function which is
 *     called to pass the result or error. The first parameter is the checking
 *     result and the second is the error if it occurs.
 */
accountchooser.Api.prototype.checkEmpty = function(callback) {
  this.query_(accountchooser.rpc.Queries.AC_EMPTY, null, callback);
};

/**
 * Alias for checkEmpty.
 * @deprecated The API is renamed. The old one is kept only for backward
 *    compatibility and will be removed soon.
 */
accountchooser.Api.prototype.checkCdsEmpty =
    accountchooser.Api.prototype.checkEmpty;

/**
 * Checks whether accountchooser has this account in its storage.
 * @param {accountchooser.Account} account The account to be checked.
 * @param {function(boolean=, Object=)} callback The callback function which is
 *     called to pass the result or error. The first parameter is the checking
 *     result and the second is the error if it occurs.
 */
accountchooser.Api.prototype.checkAccountExist = function(account, callback) {
  this.query_(accountchooser.rpc.Queries.ACCOUNT_EXIST, account, callback);
};

/**
 * Checks whether the account is in accountchooser and should be updated. This
 * is only a hint, site can still call update service if this checking says no.
 * @param {accountchooser.Account} account The account to be checked.
 * @param {function(boolean=, Object=)} callback The callback function which is
 *     called to pass the result or error. The first parameter is the checking
 *     result and the second is the error if it occurs.
 */
accountchooser.Api.prototype.checkShouldUpdate = function(account, callback) {
  this.query_(accountchooser.rpc.Queries.SHOULD_UPDATE, account, callback);
};

/**
 * Alias for Api.
 * @deprecated The API is renamed. The old one is kept only for backward
 *    compatibility and will be removed soon.
 */
accountchooser.CdsClient = accountchooser.Api;



/**
 * Namespace for accountchooser event.
 */
accountchooser.event = accountchooser.event || {};

/**
 * Enum for events.
 * @enum {string}
 */
accountchooser.event.EventType = {
  /** For RequestAckNotification. */
  ACK: 'ack',
  /** For Response. */
  DONE: 'done',
  /** For EmptyResponseNotification. */
  EMPTY_RESPONSE: 'emptyResponse',
  /** For ServerReadyNotification. */
  SERVER_READY: 'serverReady'
};

/**
 * All the listeners
 * @type {
 *    Array.<{
 *      listener: function(accountchooser.rpc.RpcObject),
 *      event: accountchooser.event.EventType,
 *      oneTime: boolean,
 *      service: (?string|undefined)
 *    }>
 * }
 * @private
 */
accountchooser.event.listeners_ = [];

/**
 * Translates a rpcObject to an event.
 * @param {accountchooser.rpc.RpcObject} rpcObject The received RpcObject.
 * @return {?accountchooser.event.EventType} the correspond event.
 * @private
 */
accountchooser.event.getEventType_ = function(rpcObject) {
  var event = null;
  if (rpcObject instanceof accountchooser.rpc.RequestAckNotification) {
    event = accountchooser.event.EventType.ACK;
  } else if (rpcObject instanceof accountchooser.rpc.ServerReadyNotification) {
    event = accountchooser.event.EventType.SERVER_READY;
  } else if (rpcObject instanceof accountchooser.rpc.Response) {
    event = accountchooser.event.EventType.DONE;
  } else if (rpcObject instanceof
      accountchooser.rpc.EmptyResponseNotification) {
    event = accountchooser.event.EventType.EMPTY_RESPONSE;
  }
  return event;
};

/**
 * Adds a event listener.
 * @param {function(accountchooser.rpc.RpcObject)} listener The event listener.
 * @param {accountchooser.event.EventType} event The event to be listened.
 * @param {boolean} opt_oneTime If true, remove the listener immediately after
 *     it is called.
 * @param {string} opt_service The service filter. If set, only invoked when
 *     the id of the response is same to the service.
 */
accountchooser.event.addResponseListener = function(listener, event,
    opt_oneTime, opt_service) {
  var l = {
    listener: listener,
    event: event,
    oneTime: !!opt_oneTime,
    service: opt_service
  };
  accountchooser.event.listeners_.push(l);
};

/**
 * Removes a listener.
 * @param {function(accountchooser.rpc.RpcObject)} listener The listener to be
 *     removed.
 */
accountchooser.event.removeResponseListener = function(listener) {
  var i = 0;
  while (i < accountchooser.event.listeners_.length) {
    if (accountchooser.event.listeners_[i].listener == listener) {
      accountchooser.event.listeners_.splice(i, 1);
    } else {
      i++;
    }
  }
};

/**
 * Removes all the listeners.
 */
accountchooser.event.clearResponseListeners = function() {
  accountchooser.event.listeners_ = [];
};

/**
 * Fires event to listeners.
 * @param {accountchooser.rpc.RpcObject} rpcObject The received RpcObject.
 */
accountchooser.event.fireResponseEvent = function(rpcObject) {
  var event = accountchooser.event.getEventType_(rpcObject);
  if (!event) {
    return;
  }
  var i = 0;
  while (i < accountchooser.event.listeners_.length) {
    var listener = accountchooser.event.listeners_[i];
    if (event != listener.event) {
      i++;
      continue;
    }
    if (listener.service) {
      if (rpcObject instanceof accountchooser.rpc.RequestAckNotification &&
          rpcObject.getRequestId() != listener.service) {
        i++;
        continue;
      } else if (rpcObject instanceof accountchooser.rpc.Response &&
          rpcObject.getId() != listener.service) {
        i++;
        continue;
      }
    }
    listener.listener(rpcObject);
    if (listener.oneTime) {
      accountchooser.event.listeners_.splice(i, 1);
    } else {
      i++;
    }
  }
};

