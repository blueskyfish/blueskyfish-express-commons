
![BlueSkyFish Express Commons](logo.png)

# BlueSkyFish Express Commons

> A small library for express micro services written in typescript

Helpful classes and functions for create a express micro service.


## Requirements

* [NodeJS][nodejs] Version 8.x or higher.
* [Typescript][typescript] Version 2.6.2 or higher.
* [Express][express] Version 4.16 or higher

Global installed typescript. `npm install --global typescript`.

The library is written in [Typescript][typescript]. During the installation of the library it will be compiled into Javascript **ES2015** modules.


## Installation


```bash
$ npm install -S blueskyfish-express-commons
```


## Dependencies

All libraries from **blueskyfish-express-*** and depended applications should use the same version of the dependencies node modules.

| name                    | Version
|-------------------------|-------------
| `express`               | `4.16.3`
| `lodash`                | `4.17.5`
| `moment`                | `2.22.0`
|-------------------------|-------------
| `mocha`                 | `5.1.0`
| `ts-node`               | `5.0.1`
| `typescript`            | `2.6.2`


## History

| Version    | Date       | Description
|------------|:----------:|--------------------------------------------
| `0.1.0`    | 2018-04-20 | add renderView method for Http and improve the js doc.<br>rework the HttpStatus enum to a type of `okay` and `error`.
| `0.0.12`   | 2018-04-13 | adjust the version of the depended node modules.
| `0.0.11`   | 2018-02-22 | adjust the version of the depended node modules.
| `0.0.10`   | 2018-02-14 | Add response.end call and improve the error sending.
| `0.0.9`    | 2018-02-13 | interface from base error.
| `0.0.8`    | 2018-02-11 | send error code and error group
| `0.0.7`    | 2018-02-11 | request params with string and number (`reg.params[0]` or `req.params['name']`<br>Log Level comparing
| `0.0.6`    | 2018-02-06 | add file operation with promise.
| `0.0.5`    | 2018-01-28 | add the signal name of the shutdown function.
| `0.0.3`    | 2018-01-25 | send media data with http.
| `0.0.2`    | 2018-01-23 | reading environment.
| `0.0.1`    | 2018-01-21 | Initial the library. It is extract from my other internal projects.


## License

```text
The MIT License

Copyright 2018 BlueSkyFish

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

[nodejs]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[express]: https://expressjs.com/
