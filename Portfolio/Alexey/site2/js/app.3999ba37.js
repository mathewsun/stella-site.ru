(function (t) {
    function e(e) {
        for (var n, r, o = e[0], c = e[1], l = e[2], d = 0, u = []; d < o.length; d++) r = o[d], s[r] && u.push(s[r][0]), s[r] = 0;
        for (n in c) Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n]);
        p && p(e);
        while (u.length) u.shift()();
        return a.push.apply(a, l || []), i()
    }

    function i() {
        for (var t, e = 0; e < a.length; e++) {
            for (var i = a[e], n = !0, o = 1; o < i.length; o++) {
                var c = i[o];
                0 !== s[c] && (n = !1)
            }
            n && (a.splice(e--, 1), t = r(r.s = i[0]))
        }
        return t
    }
    var n = {}
        , s = {
            app: 0
        }
        , a = [];

    function r(e) {
        if (n[e]) return n[e].exports;
        var i = n[e] = {
            i: e
            , l: !1
            , exports: {}
        };
        return t[e].call(i.exports, i, i.exports, r), i.l = !0, i.exports
    }
    r.m = t, r.c = n, r.d = function (t, e, i) {
        r.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0
            , get: i
        })
    }, r.r = function (t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" === typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (r.r(i), Object.defineProperty(i, "default", {
                enumerable: !0
                , value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) r.d(i, n, function (e) {
                return t[e]
            }.bind(null, n));
        return i
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t["default"]
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "/";
    var o = window["webpackJsonp"] = window["webpackJsonp"] || []
        , c = o.push.bind(o);
    o.push = e, o = o.slice();
    for (var l = 0; l < o.length; l++) e(o[l]);
    var p = c;
    a.push([0, "chunk-vendors"]), i()
})({
    0: function (t, e, i) {
        t.exports = i("56d7")
    }
    , "07b7": function (t, e, i) {
        t.exports = "img/avatar-daria.154c33ae.png"
    }
    , "07c4": function (t, e, i) {
        t.exports = "img/avatar-vladimir.1983af22.png"
    }
    , "0cf1": function (t, e, i) {
        t.exports = "img/mvp-5.8ca9a896.png"
    }
    , 1195: function (t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkBAMAAADrm5hyAAAAJ1BMVEX///8AAAD///////////////////////////////////////////8wxMEwAAAADXRSTlMzAC0VGyolDwgFIBIMvyW24gAAAspJREFUaN7k0zFvEnEYx/FvDjgqdBDuKJA6HI0m6gSJixun0RmMo8M1cXKCzbG4OKOjC3FwcmhHtzq4+Ko8ESmFO/539/8tTT8v4JvnyZOHhtnHJ99encDJg3fP3zfMjMkvLwM2OG9/WCY/f2XH46cWyfYLEr2eFk3+DkjhfC+U7D5jj/vz/Ml2xF7uNG/SG2FQGeRLegFGTkoTQ9HQzJxsB2TiTLMmOxEZubOMySGZlbMlf5HDmyxJn1xCc7IzIpfKzJg8J6e6KemTW7g/2Y3IzZ3vTX6ggIdbScPbFHgizLcxq6cnPQoapCb7FFRKS3qgGBPFkFBKTh5j4SIxeYmFw6RkJ8CCM0tIfsLKo4RkhBV3N+ljKdxJnmOpvp3sYG22lWxhbbyVHGKtfD15D4Gf15ItkG2ObG8obyY7SMw2kkdInG4kJ0hUN5IjJCpXSQ+RwTrZRKS3TvYRKa2TASLO/6SHzGCVbCEzXiUnyFRXyQgZ91+yi9B8mfQRCpfJJkK9ZfISocNlcoFQbZkMEHL+JttITeOkj1QYJ1tIjePkGVIHcbKPVClOLpCqxckAKadBF7E5x4hd4CMWcoTYKU3EetxF7A5niB0wQaxKH7ESQ8TKLBCrESHmMkKsQoCYc1uTN8Wf6u3YBkAgiIGgREZISkTJtECndAABs+K/gU8Qd2d7fUzw5BxffCl+SD82iuHmR3CxKPw6K5buqZ9ciwPGn1nFMehP1uKw9ue/FymNlPKCz8tSL54bie+NCG+XeFPHW0+VQeZtPG82ekvUG7feXvYmuLfqw0DBxx4+nPERkg+6fBznQ0MfbfoA1sfEPsz2kXsPBmz71ycvD1nEKIgHVjxW4+Efjyh5kMrjXh5K8+icB/w8htjDkh8G0uXB0wKP9RCvR409EO2xbQ+XewTeg/q+TvB/6eG9mjFGgeSx5jJSGQdUhkyx6QZ+Bw/y5yQ1VgAAAABJRU5ErkJggg=="
    }
    , "1c82": function (t, e, i) {
        t.exports = "img/avatar-alexej.fb1c55b1.png"
    }
    , "1fa4": function (t, e, i) {
        t.exports = "img/shema-2.443f409d.png"
    }
    , "22a7": function (t, e, i) {
        t.exports = "img/cube__light.169e92ed.svg"
    }
    , "26cf": function (t, e, i) {
        t.exports = "img/avatar-andrej.9138758b.png"
    }
    , "2d9e": function (t, e, i) {
        t.exports = "img/avatar-muslim.6caaaaaa.png"
    }
    , "2fba": function (t, e, i) {
        t.exports = "img/graph__long.55979166.svg"
    }
    , 3504: function (t) {
        t.exports = {
            header: {
                description: "Automatic Cross-chain Settlement System"
                , nav: {
                    list: [{
                        title: "产品"
                        , hash: "#product"
                    }, {
                        title: "機會"
                        , hash: "#scope"
                    }, {
                        title: "平台"
                        , hash: "#architecture"
                    }, {
                        title: "团队"
                        , hash: "#team"
                    }, {
                        title: "文件"
                        , hash: "#documents"
                    }]
                }
            }
            , hero: {
                title: "未来的金融生态系统"
                , description: "独特的加密银行系统，虚拟地工作。 它专为即时金融交易而设计 - 使用现代区块链技术的交易和最方便的非接触式支付。"
            }
            , product: {
                title: "世界银行业的一个新成就"
                , list: [{
                    title: "个特殊的分散式虚拟加密银行ACSS提供以下服务：世界各国的即时非接触式支付，您可以支付服务和货物进行多种货币交易。 加密银行有一个集成系统，旨在交换法定货币和加密货币。"
                }, {
                    title: "ACSS项目在没有中间人协助的情况下进行，有自己的加密货币交换。此外，还有一个银行间生态系统。 它基于区块链技术，旨在整合所有客户服务流程和融资程序。"
                }, {
                    title: "该项目是一个非常简单且通俗的加密工具，佣金最低;它使用智能合约进行完全安全的交易。 由于内部生态系统，有一个很好的机会来创建各种社会和金融机构，然后使用他们自己的分散注册管理它们。"
                }]
            }
            , scope: {
                title: "我们删除了加密世界中的所有限制"
                , description: "您可以自由选择支付系统，并使用分散的加密银行生态系统摆脱加密货币禁止，该生态系统在区块链技术的帮助下实际工作，区块链技术使用非接触式支付进行即时支付。"
                , message: "Sorry, there's a problem playing this video. Please try using adifferent browser."
            }
            , platform: {
                title: "当前的系统和加密货币交易所的财务模型"
                , description: "让我们更详细地考虑一下我们生态系统工作中存在的佣金"
                , group: [{
                    title: "加密银行。"
                    , description: "它需要总付款0.5％的佣金。"
                }, {
                    title: "银行。"
                    , description: "开证行和收单银行的工作由佣金支付，金额为总付款的2％至4％。"
                }, {
                    title: "加密货币交易所。"
                    , description: "加密货币交易所的工作，比如Kraken, Bitfinex, Binance, Bittrex Poloniex这些交易所，佣金为总付款的2％至4％。"
                }, {
                    title: "加密银行是分散的。"
                    , description: "使用智能合约系统，客户可以直接使用CryptoBank。 这有助于节省交易和佣金，超过总付款的8.7％。"
                }, {
                    title: "支付系统。"
                    , description: "通过支付宝， MasterCard, Visa，PayPal付款时，将收取总金额2％至4％的佣金。"
                }, {
                    title: "智能合约。 "
                    , description: "对于交易的实施，加密银行采取0.5％的佣金，加密货币交易所 -  0.1％的佣金。"
                }]
            }
            , figures: {
                title: "关于集中式和分散式平台的数量简介"
                , description: "要了解平台的工作原理，我们需要确保其性能。 为此，请参阅以下数字。"
                , first: {
                    list: [{
                        description: "加密兑换佣金仅为付款总金额的0.2％."
                    }, {
                        description: "性能 - 91, 65%."
                    }, {
                        description: "银行佣金为2,4%."
                    }, {
                        description: "加密银行佣金仅为付款总金额的0.5％."
                    }, {
                        description: "对于支付系统，会有2.4％的佣金。"
                    }]
                }
                , second: {
                    list: [{
                        description: "加密兑换佣金为0,1%."
                    }, {
                        description: "系统性能达到99.4％。"
                    }, {
                        description: "加密银行佣金也为0,5%."
                    }]
                }
                , conclusion: {
                    title: "结论"
                    , description: "由于完全没有中介机构，ACSS平台已经具有7.75％的成本效益。因此，每年可以在加密货币市场平静地释放超过360亿美元。"
                }
            }
            , banking: {
                centralized: {
                    title: "银行集中系统"
                    , list: [{
                        title: "集中式平台"
                        , description: "这种系统的特点是该过程中有许多经纪人参与。它们不提供交易透明度，不仅增加了商家的佣金，还增加了分支机构的佣金。"
                    }, {
                        title: "增加佣金。 "
                        , description: "仅基于所有者自身利益的金融系统以佣金的形式提供高达平均预算的10％的成本。"
                    }, {
                        title: "高成本。"
                        , description: "管理，提供服务和会计 - 这种金融解决方案以及支付系统对于企业账户而言过于昂贵。"
                    }, {
                        title: "缺乏匿名性和可扩展性。"
                        , description: "银行集中系统已经过时，因此很难实施现代技术解决方案。 法律实体不再提供交易匿名。"
                    }]
                }
                , decentralized: {
                    title: "ACSS分散系统"
                    , list: [{
                        title: "分散式平台"
                        , description: "帮助创建一个完全透明和自动化的生态系统，这是使用特殊的工程技术创建的。 生态系统成功地连接经纪人，同时使用智能系统进行公平交易。"
                    }, {
                        title: "减少佣金。"
                        , description: "提供服务的ACSS系统需要约交易金额的0.5％佣金，同时根据公平交易中的资产逐渐减少利息。"
                    }, {
                        title: "生态系统完全免费使用。"
                        , description: "ACSS项目为客户提供现成的，同时免费的金融服务，以及允许与合作伙伴进行免费的沟通。"
                    }, {
                        title: "匿名性和可扩展性。"
                        , description: "由于账户和关税的多样性，可以确保使用加密货币支付交易完全匿名。 与此同时，这种联系在全球范围内进行。"
                    }]
                }
            }
            , architecture: {
                title: "平台"
                , ecosystem: {
                    title: "ACSS生态系统"
                    , description: "DApp和其他类型的外部服务将使用唯一API连接到ACSS。 区块链使用Json-RPC API协议与网络中的任何类型的硬币和智能合约进行交互。 我们使用web-3和负载平衡器对它们进行排序。稳定的令牌通过实时交换支持的加密货币系统交换实时数据备份。"
                }
                , banking: {
                    title: "银行系统"
                    , description: "ACSS银行生态系统基于其自身和灵活的交互，或主要业务流程（服务，管理和合规），公司信息系统（如数据统计，DApps管理和客户集成）与其自身内部数据处理水平（在区块链中）之间的关系 ，文档，转移历史等）。"
                }
                , exchange: {
                    title: "交换系统"
                    , description: "混合交换应该是中庸之道，把集中交换的优势，例如与大投资者的合作和许多用户的信任，以及分散交换的优势，例如安全存储和缺乏对更高权限的从属关系，完全匿名，联合起来。"
                }
                , blockchain: {
                    title: "区块链"
                    , description: "1.开放式区块链网络的目标是开发一种用于构建分散式应用程序的替代协议，这是一套全面的妥协方案，对于广泛的分散式应用程序非常有用，特别强调开发时间速度，数据安全性且很少使用的应用程序，以及各种应用程序有效通信的能力都十分重要。ACSS网络通过从本质上创建最终的抽象基础层来实现这一目标：一系列具有集成的图灵完整编程语言的块，允许任何人编写智能合约和分散的应用程序，他们可以为所有权，交易形式和功能创建自己的任意规则。2. 安全区块链包括开放区块链的所有好处，其目标是在业务链中提供安全服务。 基于安全区块链，我们将推出Stabletokens智能合约，KYC数据仓库和各种商业应用程序。 使用lifefeed的加密货币交换的反向连接将基于实际交易数据提供智能合约。"
                }
                , api: {
                    title: "API"
                    , description: "API管理是ACSS核心服务和用于连接其他合作伙伴服务的本机可扩展平台的技术组合。 基于区块链的数据清理解决方案通过web-3和负载平衡器与轻量级协议JSON-RPC API远程过程配合使用。未来不断发展的原子交换解决方案将提供与任何硬币和智能合约系列交互的能力。"
                }
            }
            , convenient: {
                title: "对于自然人和法人实体，ACSS平台为每个消费者提供了便利"
                , stakeholder: {
                    title: "对于每个利益相关者"
                    , list: [{
                        description: "绝对的可靠性和快速转移的完全安全性，不受限制，佣金仅为0.5％。"
                    }, {
                        description: "拥有自己的加密交换有助于加密和撤销加密货币，仅占总数的0.1％。"
                    }, {
                        description: "没有隐藏的费用，最低的佣金"
                    }, {
                        description: "向法人实体和自然人提供贷款的可能性。"
                    }, {
                        description: "即时购买和交换加密货币的最优惠价格"
                    }, {
                        description: "投资基金将有助于实施任何项目，采矿等等。"
                    }, {
                        description: "自有银行间金融渠道系统（类似SWIFT）。"
                    }, {
                        description: "自己的加密ATM和与现有的集成。"
                    }, {
                        description: "个在线顾问机器人，它将告知客户何时以更好的价格购买或出售加密货币。"
                    }]
                }
                , individuals: {
                    title: "对于个人而言"
                    , list: [{
                        description: "使用加密货币的任何服务的即时智能合约付款，无需从您的钱包中提取资金。"
                    }, {
                        description: "NFC技术支持的移动设备的非接触式支付方式。"
                    }, {
                        description: "良好的忠诚度系统，奖金和现金返还操作，良好的存款利率。"
                    }, {
                        description: "Autonomy，即使您的设备上没有移动互联网，该应用也将在全球范围内推出。"
                    }, {
                        description: "NFC到NFC加密货币交换。"
                    }]
                }
                , entities: {
                    title: "对于法人实体"
                    , list: [{
                        description: "非现金购买加密货币的速度很快。"
                    }, {
                        description: "公司资金在加密项目中的法律投资，购买代币，参与ICO。"
                    }, {
                        description: "薪资项目。"
                    }, {
                        description: "从世界任何地方提取现金。"
                    }]
                }
            }
            , mvp: {
                title: "MVP应用程序"
                , features: {
                    title: "功能"
                    , list: [{
                        description: "分散钱包"
                    }, {
                        description: "注册后立即获得免费的虚拟多币种卡"
                    }, {
                        description: "即时支付和将加密货币转移到法定货币的交易。"
                    }, {
                        description: "每笔交易的忠诚度和返现计划，增加了代币的返现率。"
                    }, {
                        description: "能够匿名使用ACSS生态系统"
                    }, {
                        description: "与外部钱包或服务集成，例如PayPal, Gyft, WeChat, Alipay, PayTM, Visa, MasterCard). MasterCard Worldbonuses."
                    }, {
                        description: "非接触式支付选项，如QR，ApplePay，SamsungPay，AndroidPay等等。"
                    }]
                }
                , wallet: {
                    title: "钱包"
                    , list: [{
                        description: "多货币，加密货币"
                    }, {
                        description: "在用户设备上分散和存储资金"
                    }, {
                        description: "匿名和非匿名交易"
                    }, {
                        description: "链接加密货币"
                    }, {
                        description: "链接现有的银行卡"
                    }, {
                        description: "时间和费用报告"
                    }, {
                        description: "用于存储和交易加密货币的提案系统"
                    }]
                }
                , payments: {
                    title: "NFC和QR支付"
                    , list: [{
                        description: "全球支付最低费用。"
                    }, {
                        description: "无需在队列中等待事务订单。"
                    }, {
                        description: "我们的内置交换机具有即时自动交换功能。"
                    }, {
                        description: "灵活的帐户系统。"
                    }, {
                        description: "没有地理和法律限制。"
                    }, {
                        description: "NFC非接触式支付。"
                    }, {
                        description: "通过QR方便和受网络钓鱼保护的付款。"
                    }]
                }
                , deposits: {
                    title: "存款"
                    , list: [{
                        description: "方便的财务存款界面"
                    }, {
                        description: "个人匿名和透明的分散账户"
                    }, {
                        description: "组交互式自定义报告"
                    }, {
                        description: "灵活的忠诚度，奖金和退款制度"
                    }, {
                        description: "与加密货币和法定货币的多货币整合"
                    }, {
                        description: "贸易警报系统"
                    }, {
                        description: "稳定货币内部系统"
                    }, {
                        description: "与虚拟卡相关的帐户"
                    }]
                }
                , management: {
                    title: "管理和报告"
                    , list: [{
                        description: "在线财务报告"
                    }, {
                        description: "加密货币存款的报告"
                    }, {
                        description: "投资组合收入额分析"
                    }, {
                        description: "成本分析和退款"
                    }, {
                        description: "个人财务管理"
                    }, {
                        description: "方便的系统设置"
                    }, {
                        description: "业务报告"
                    }, {
                        description: "方便的本地报告可视化"
                    }]
                }
                , button: "立即获取应用程序"
            }
            , team: {
                title: "球队"
            }
            , documents: {
                title: "文件"
                , button: "打开文件"
            }
            , partners: {
                title: "伙伴"
            }
        }
    }
    , 4760: function (t, e, i) {
        t.exports = "img/mvp-1.641c1d33.png"
    }
    , "49f8": function (t, e, i) {
        var n = {
            "./en.json": "edd4"
            , "./ru.json": "7704"
            , "./zh.json": "3504"
        };

        function s(t) {
            var e = a(t);
            return i(e)
        }

        function a(t) {
            var e = n[t];
            if (!(e + 1)) {
                var i = new Error("Cannot find module '" + t + "'");
                throw i.code = "MODULE_NOT_FOUND", i
            }
            return e
        }
        s.keys = function () {
            return Object.keys(n)
        }, s.resolve = a, t.exports = s, s.id = "49f8"
    }
    , "4af9": function (t, e, i) {
        t.exports = "img/slide-up.8eb930cd.svg"
    }
    , "52e4": function (t, e, i) {
        t.exports = "img/shema-4.7b6fed23.png"
    }
    , "52f9": function (t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABBCAMAAADcxMsIAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMAC7tBA/cZBl+rZCCF8HAc3MBEOy3FWDAn8+zXyrFSNBXl4c6UjoARDqB6TYprI+maSKZ1Nyq1E9JrtlR0AAAFpklEQVRYw8TV2XKiQBiG4c9WAiKuKKIOYlQWFYNGJX73f2MjVGVqFkhQm5rnhAOWt/6GaiBFODQ7nSgRYqQoJBVlJESy7QyGqEo4ttbOUmGBOIl2C0h20aO+wky8cgzjVE+FapgejobxvmJG7FuQxdY3S6am/bVmdhvI9XG7rMeb5kDG2s69HlOjSLNLLMs2nVs8WV7oiZI1t/UFyhpv0pkDPKqrO7yZHXYvuM9lQy4fG1ndbbKof8Yjjktyj7vZxivJq2HiUWqT1HCfo0MyXrt4SkTWUV6wv5IcaSqeJTgJS1f9Nql4Y0igTumVrU7I2X4BOeZkmUd9ZFUd8sx4wrf8tuQq0OEPfEO7Sq8CLbKGr7gJGeuQrTGl+dVpj6QRQD7BAQoNZqQzRBWc4q1DXZOvO1RCnfFYNGyPPNRQjRrZQi4/G7YqY06QJ0jI5gKVOVEgh9kj96jQiqf87TN2UaEx2cU/DHIUokpNJrlZD5W6kPZ/yEIwyctGqJZO2jnZOaSxrY7WwN9cb5uzW2xxL9VtFX4/03Y8+LzsvYYCx9/fbWBZ2S1nywpRIIwOb3gjbeTqC0CwAfV8AXRqXTTcYe7feINfNJIBEPDPpVc7/gs+maT/szYzXVMTCKLoBVlVEARREBfA3Yj76H3/F8s0mi+i2WaGnD+K8HG6q6rLRoW3+5sCkgGNp0uaRTMMGG8055ouldddT4aytw4ET17p0TJ3XU8M1/+N1xXj3igaAkJTNSwaOL0E5xvVcalrJRwAB6r3CpeK/OSkd0/U/eXuHUvFNfqTV+IGxqCToKW2gPVAthovzWtdHsYyCoHIOhTRr6ek2cCUgnaejfRrWN8lsS+8Xfhp0kLeIWm2Svnt8rJie6MiVyXMuB+y9Rxl86kYmxOOF9zVOAXaZCdlgnpMXjsnj+qW9FakKbwaIn7D2Ho/pfLnfOK0azCGS21CSaOx2FGzOXpezeWy3XG/5trj8MwDEItc90VEip6uJ2TgAfHNiz23CroUzof0HWM3HSjoxc504mOZtSE7k2kbj4S0nxdfT+J0xrlHB0rEZrDuc4UxOSqiY+CdKQ/Ca6qqBmhkMn2KYqkSFPGuzJoRyqRcw4qsEEM6OPOGDe3mdW5FPrl5SXUlYhaKSz7Yq5sokzCASQ5Q5xWLkM0gWLfHwtstvMaD1ziS++KJJi0/ZPon/JH560ZL3Nkgj/BpjdG/Lybh7b14xbhlKGNAUh+2EooZRU65p4yPeCTg9fVL0ocyHBYzPGFDum8WNXGUdkT91vHOkgPhHaFN5m2+2UvSeyiR/KJSB/SHbnQpEn1nyQnKeKEloaBlWWexnN8xNShTS8w4s4JikVu7+/ksNPKE5NZ4aG0rYO3qyrLjtjBpmkkdGTsGjtdsjeZqasHlGmUUScIdSVIANPY16X4oKffPoEv6j/PiZG/v6Y+daA/Bm6Ms+3B5nFIfqt2WIdbIvM5OHS5PqBz/7rUG9oGQtxhRylXgLdnYrEFEnGyjciTOIIjiZTOAu8WQ+kgFzHCyq8+Lfp2yhuoZsNv4toTjABocFQYx4gUzAi2MmANvbKN69JjqdoM8ipMd3BR+6C/6mQc5ya7Iw4YY2QrVMjwVKR4VNdr2gcUcuGhA9wJ4HqBfFMBmB1Wyd/lPmdNIv0KrTNIc/VsJyKiIwCW5O+OfOFe0cdZWjrD28K9MyBxfxduRjFY9fICM1tfEvWKq2WbxwQhFtE74LONjhyLAn7hDKyZnn5up7Qpp/NkfTg9k3MbHkGrfYiHtHM/4NEFKyh+o6+7mEBbS1RlfQp+FZDKpKX/PSm0lJ8K5NY0evs5ik5EMTfvU+p2xazQHWwoi0x4pqAp/1qegLzebw9o7mj6vCeri3z6HN+KdcFZMI5jEIX+NmpqToDbG/0L3a7Z9kN/pbC1ZMDja9smXUBnfAWSx2HyJNqh2AAAAAElFTkSuQmCC"
    }
    , "54e4": function (t, e, i) {
        t.exports = "img/credit__cards.b2132280.png"
    }
    , "56d7": function (t, e, i) {
        "use strict";
        i.r(e);
        i("cadf"), i("551c"), i("f751"), i("097d");
        var n = i("2b0e")
            , s = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("div", {
                    attrs: {
                        id: "app"
                    }
                }, [i("header", [i("header-nav")], 1), i("main", [i("section", {
                    staticClass: "hero"
                    , attrs: {
                        id: "hero"
                    }
                }, [i("h1", [t._v(t._s(t.$t("hero.title")))]), i("article", [i("p", [t._v("\n          " + t._s(t.$t("hero.description")) + "\n        ")])]), t._m(0)]), i("product"), i("scope"), i("platform"), i("figures"), i("banking"), i("architecture"), i("convenient"), i("mvp"), i("team"), i("documents"), i("partners")], 1), i("footer", [i("footer-nav")], 1)])
            }
            , a = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("5707")
                        , alt: ""
                    }
                })])
            }]
            , r = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("nav", {
                    staticClass: "nav responsive__padding"
                }, [i("ul", {
                    staticClass: "nav__brand"
                }, [i("li", {
                    directives: [{
                        name: "scroll-to"
                        , rawName: "v-scroll-to"
                        , value: {
                            el: "#top"
                        }
                        , expression: "{ el: '#top' }"
                    }]
                }, [t._v("\n      ACSS "), i("span", [t._v(t._s(t.$t("header.description")))])])]), i("ul", {
                    staticClass: "nav__burger"
                    , on: {
                        click: function (e) {
                            t.listOpen = !t.listOpen
                        }
                    }
                }, [i("li"), i("li"), i("li")]), i("ul", {
                    staticClass: "nav__list"
                    , class: {
                        "nav__list--open": t.listOpen
                    }
                }, t._l(t.$t("header.nav.list"), function (e, n) {
                    return i("li", {
                        directives: [{
                            name: "scroll-to"
                            , rawName: "v-scroll-to"
                            , value: {
                                el: e.hash
                            }
                            , expression: "{ el: item.hash }"
                        }]
                        , key: "item" + n
                    }, [t._v("\n      " + t._s(e.title) + "\n    ")])
                }), 0), i("locale-dropdown", {
                    class: {
                        "nav__sub--open": t.listOpen
                    }
                })], 1)
            }
            , o = []
            , c = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("ul", {
                    staticClass: "nav__sub"
                }, [i("li", {
                    on: {
                        click: function (e) {
                            t.subOpen = !t.subOpen
                        }
                    }
                }, [t._v("\n    " + t._s(t.$i18n.locale) + "\n  ")]), t.subOpen ? i("ul", t._l(t.$i18n.availableLocales, function (e, n) {
                    return i("li", {
                        key: "locale" + n
                        , on: {
                            click: function (i) {
                                return t.setLanguage(e)
                            }
                        }
                    }, [t._v("\n      " + t._s(e) + "\n    ")])
                }), 0) : t._e()])
            }
            , l = []
            , p = {
                data: function () {
                    return {
                        subOpen: !1
                    }
                }
                , methods: {
                    setLanguage: function (t) {
                        this.$i18n.locale = t, this.subOpen = !1, localStorage.language = t
                    }
                }
            }
            , d = p
            , u = i("2877")
            , m = Object(u["a"])(d, c, l, !1, null, "174046bd", null)
            , f = m.exports
            , v = {
                data: function () {
                    return {
                        listOpen: !1
                    }
                }
                , components: {
                    localeDropdown: f
                }
                , methods: {}
            }
            , h = v
            , g = Object(u["a"])(h, r, o, !1, null, "617037c4", null)
            , y = g.exports
            , b = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("nav", {
                    staticClass: "nav"
                }, [i("ul", {
                    staticClass: "nav__brand"
                }, [i("li", {
                    directives: [{
                        name: "scroll-to"
                        , rawName: "v-scroll-to"
                        , value: {
                            el: "#top"
                        }
                        , expression: "{ el: '#top' }"
                    }]
                }, [t._v("\n      ACSS "), i("span", [t._v(t._s(t.$t("header.description")))])])]), i("ul", {
                    staticClass: "back"
                }, [i("li", {
                    directives: [{
                        name: "scroll-to"
                        , rawName: "v-scroll-to"
                        , value: {
                            el: "#top"
                        }
                        , expression: "{ el: '#top' }"
                    }]
                }, [t._m(0)])])])
            }
            , _ = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("4af9")
                        , alt: ""
                    }
                })])
            }]
            , C = {}
            , A = C
            , w = Object(u["a"])(A, b, _, !1, null, "d01addd2", null)
            , k = w.exports
            , x = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "product"
                    , attrs: {
                        id: "product"
                    }
                }, [t._m(0), i("div", {
                    staticClass: "product__item"
                }, [i("h2", [t._v(t._s(t.$t("product.title")))]), i("article", [t._l(t.$t("product.list"), function (e, n) {
                    return i("p", {
                        key: "item" + n
                    }, [t._v("\n        " + t._s(e.title) + "\n      ")])
                }), i("ul", {
                    staticClass: "app"
                }, [i("li", [i("a", {
                    attrs: {
                        href: "https://twitter.com/AcssBlockchain"
                        , target: "_blank"
                    }
                }, [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , viewBox: "0 0 24 24"
                        , width: "48"
                        , height: "48"
                        , fill: "#ffffff"
                    }
                }, [i("path", {
                    attrs: {
                        d: "M 24 4.300781 C 23.101563 4.699219 22.199219 5 21.199219 5.101563 C 22.199219 4.5 23 3.5 23.398438 2.398438 C 22.398438 3 21.398438 3.398438 20.300781 3.601563 C 19.300781 2.601563 18 2 16.601563 2 C 13.898438 2 11.699219 4.199219 11.699219 6.898438 C 11.699219 7.300781 11.699219 7.699219 11.800781 8 C 7.699219 7.800781 4.101563 5.898438 1.699219 2.898438 C 1.199219 3.601563 1 4.5 1 5.398438 C 1 7.101563 1.898438 8.601563 3.199219 9.5 C 2.398438 9.398438 1.601563 9.199219 1 8.898438 C 1 8.898438 1 8.898438 1 9 C 1 11.398438 2.699219 13.398438 4.898438 13.800781 C 4.5 13.898438 4.101563 14 3.601563 14 C 3.300781 14 3 14 2.699219 13.898438 C 3.300781 15.898438 5.101563 17.300781 7.300781 17.300781 C 5.601563 18.601563 3.5 19.398438 1.199219 19.398438 C 0.800781 19.398438 0.398438 19.398438 0 19.300781 C 2.199219 20.699219 4.800781 21.5 7.5 21.5 C 16.601563 21.5 21.5 14 21.5 7.5 C 21.5 7.300781 21.5 7.101563 21.5 6.898438 C 22.5 6.199219 23.300781 5.300781 24 4.300781"
                    }
                })])])]), i("li", [i("a", {
                    attrs: {
                        href: "https://www.youtube.com/channel/UCjdPzOTWjEPzOzJYe_NYu6g?view_as=subscriber"
                        , target: "_blank"
                    }
                }, [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , "xmlns:xlink": "http://www.w3.org/1999/xlink"
                        , width: "48pt"
                        , height: "48pt"
                        , viewBox: "0 0 48 48"
                        , version: "1.1"
                    }
                }, [i("g", {
                    attrs: {
                        id: "surface1879873"
                    }
                }, [i("path", {
                    staticStyle: {
                        stroke: "none"
                        , "fill-rule": "nonzero"
                        , fill: "rgb(100%,100%,100%)"
                        , "fill-opacity": "1"
                    }
                    , attrs: {
                        d: "M 43.164062 12.371094 C 42.703125 10.652344 41.347656 9.296875 39.628906 8.835938 C 36.507812 8 24 8 24 8 C 24 8 11.492188 8 8.371094 8.835938 C 6.652344 9.296875 5.296875 10.652344 4.835938 12.371094 C 4 15.492188 4 24 4 24 C 4 24 4 32.507812 4.835938 35.628906 C 5.296875 37.347656 6.652344 38.703125 8.371094 39.164062 C 11.492188 40 24 40 24 40 C 24 40 36.507812 40 39.628906 39.164062 C 41.351562 38.703125 42.703125 37.347656 43.164062 35.628906 C 44 32.507812 44 24 44 24 C 44 24 44 15.492188 43.164062 12.371094 Z M 20 30.929688 L 20 17.070312 L 32 24 Z M 20 30.929688 "
                    }
                })])])])]), i("li", [i("a", {
                    attrs: {
                        href: "https://www.facebook.com/acss.blockchain"
                        , target: "_blank"
                    }
                }, [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , "xmlns:xlink": "http://www.w3.org/1999/xlink"
                        , width: "60pt"
                        , height: "60pt"
                        , viewBox: "0 0 60 60"
                        , version: "1.1"
                    }
                }, [i("g", {
                    attrs: {
                        id: "surface1880213"
                    }
                }, [i("path", {
                    staticStyle: {
                        stroke: "none"
                        , "fill-rule": "nonzero"
                        , fill: "rgb(100%,100%,100%)"
                        , "fill-opacity": "1"
                    }
                    , attrs: {
                        d: "M 30 6 C 16.746094 6 6 16.746094 6 30 C 6 42.03125 14.863281 51.96875 26.410156 53.703125 L 26.410156 36.359375 L 20.472656 36.359375 L 20.472656 30.050781 L 26.410156 30.050781 L 26.410156 25.855469 C 26.410156 18.902344 29.796875 15.855469 35.574219 15.855469 C 38.339844 15.855469 39.804688 16.058594 40.496094 16.152344 L 40.496094 21.65625 L 36.554688 21.65625 C 34.105469 21.65625 33.246094 23.984375 33.246094 26.605469 L 33.246094 30.050781 L 40.433594 30.050781 L 39.460938 36.359375 L 33.246094 36.359375 L 33.246094 53.753906 C 44.960938 52.164062 54 42.148438 54 30 C 54 16.746094 43.253906 6 30 6 Z M 30 6 "
                    }
                })])])])])])], 2)])])
            }
            , S = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "product__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("54e4")
                        , alt: ""
                    }
                })])])
            }]
            , E = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , O = E
            , B = Object(u["a"])(O, x, S, !1, null, "561b3d59", null)
            , M = B.exports
            , T = function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("section", {
                    staticClass: "scope"
                    , attrs: {
                        id: "scope"
                    }
                }, [n("h2", [t._v(t._s(t.$t("scope.title")))]), n("article", [n("p", [t._v("\n      " + t._s(t.$t("scope.description")) + "\n    ")])]), n("div", {
                    staticClass: "video"
                }, [n("video", {
                    attrs: {
                        id: "video"
                        , preload: "none"
                    }
                    , on: {
                        click: t.playOrPause
                    }
                }, [n("source", {
                    attrs: {
                        src: i("a5bc")
                        , type: "video/mp4"
                        , media: "all and (max-width:680px)"
                    }
                }), n("p", [t._v("\n        " + t._s(t.$t("scope.message")) + "\n      ")])]), n("button", {
                    class: {
                        isPlaying: t.isPlaying
                    }
                    , on: {
                        click: t.playOrPause
                    }
                }, [t._v("\n      " + t._s(t.isPlaying ? "⏸" : "▶") + "\n    ")])])])
            }
            , P = []
            , N = {
                data: function () {
                    return {
                        media: null
                        , isPlaying: !1
                    }
                }
                , mounted: function () {
                    var t = this;
                    this.media = this.$el.querySelector("#video"), this.media.addEventListener("ended", function () {
                        t.isPlaying = !1
                    })
                }
                , methods: {
                    play: function () {
                        this.media.play(), this.isPlaying = !0
                    }
                    , pause: function () {
                        this.media.pause(), this.isPlaying = !1
                    }
                    , playOrPause: function () {
                        this.isPlaying ? this.pause() : this.play()
                    }
                }
            }
            , j = N
            , F = Object(u["a"])(j, T, P, !1, null, "b52a9390", null)
            , z = F.exports
            , I = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "platform"
                    , attrs: {
                        id: "platform"
                    }
                }, [i("h2", [t._v(t._s(t.$t("platform.title")))]), i("article", [i("p", [t._v("\n      " + t._s(t.$t("platform.description")) + "\n    ")])]), i("div", {
                    staticClass: "container"
                }, [i("div", {
                    staticClass: "container__group"
                }, [i("div", {
                    staticClass: "platform__item"
                }, [i("span", [t._v(t._s(t.$t("platform.group[0].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[0].description")) + "\n        ")]), t._m(0)]), i("div", {
                    staticClass: "platform__item"
                }, [i("span", [t._v(t._s(t.$t("platform.group[1].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[1].description")) + "\n        ")]), t._m(1)])]), i("div", {
                    staticClass: "container__group"
                }, [i("div", {
                    staticClass: "platform__item"
                }, [t._m(2), i("span", [t._v(t._s(t.$t("platform.group[2].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[2].description")) + "\n        ")])]), i("div", {
                    staticClass: "platform__item elipses"
                }, [i("h2", [t._v(t._s(t.$t("platform.group[3].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[3].description")) + "\n        ")]), i("span", {
                    staticClass: "elipses__item"
                }), i("span", {
                    staticClass: "elipses__item"
                }), i("span", {
                    staticClass: "elipses__item"
                })]), i("div", {
                    staticClass: "platform__item"
                }, [t._m(3), i("span", [t._v(t._s(t.$t("platform.group[4].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[4].description")) + "\n        ")])])]), i("div", {
                    staticClass: "container__group"
                }, [i("div", {
                    staticClass: "platform__item"
                }, [t._m(4), i("span", [t._v(t._s(t.$t("platform.group[5].title")))]), i("p", [t._v("\n          " + t._s(t.$t("platform.group[5].description")) + "\n        ")])])])])])
            }
            , D = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("958a")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("bf53")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("958a")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("958a")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("22a7")
                        , alt: ""
                    }
                })])
            }]
            , G = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , L = G
            , Q = Object(u["a"])(L, I, D, !1, null, "50fa4d9c", null)
            , V = Q.exports
            , K = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "figures"
                    , attrs: {
                        id: "figures"
                    }
                }, [i("h2", [t._v(t._s(t.$t("figures.title")))]), i("article", [i("p", [t._v("\n      " + t._s(t.$t("figures.description")) + "\n    ")])]), i("div", {
                    staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [t._m(0), i("ul", t._l(t.$t("figures.first.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n          " + t._s(e.description) + "\n        ")])
                }), 0)]), i("div", {
                    staticClass: "group__item"
                }, [i("ul", t._l(t.$t("figures.second.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n          " + t._s(e.description) + "\n        ")])
                }), 0), t._m(1)])]), i("h2", [t._v("\n    " + t._s(t.$t("figures.conclusion.title")) + "\n  ")]), i("article", [i("p", [t._v("\n      " + t._s(t.$t("figures.conclusion.description")) + "\n    ")])])])
            }
            , R = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("2fba")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("e31f")
                        , alt: ""
                    }
                })])
            }]
            , Y = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , J = Y
            , U = Object(u["a"])(J, K, R, !1, null, "665b3772", null)
            , Z = U.exports
            , W = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "banking"
                    , attrs: {
                        id: "banking"
                    }
                }, [i("div", {
                    staticClass: "banking__item"
                }, [i("h3", [t._v("\n      " + t._s(t.$t("banking.centralized.title")) + "\n    ")]), i("ul", t._l(t.$t("banking.centralized.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [i("span", [t._v(t._s(e.title))]), i("p", [t._v("\n          " + t._s(e.description) + "\n        ")])])
                }), 0)]), t._m(0), i("div", {
                    staticClass: "banking__item"
                }, [i("h3", [t._v("\n      " + t._s(t.$t("banking.decentralized.title")) + "\n    ")]), i("ul", t._l(t.$t("banking.decentralized.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [i("span", [t._v(t._s(e.title))]), i("p", [t._v("\n          " + t._s(e.description) + "\n        ")])])
                }), 0)])])
            }
            , H = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "banking__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("d98d")
                        , alt: ""
                    }
                })])])
            }]
            , $ = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , q = $
            , X = Object(u["a"])(q, W, H, !1, null, "27c18140", null)
            , tt = X.exports
            , et = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "architecture"
                    , attrs: {
                        id: "architecture"
                    }
                }, [i("div", {
                    staticClass: "container"
                }, [i("h2", [t._v(t._s(t.$t("architecture.title")))]), i("ul", [i("li", {
                    class: [1 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 1
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("architecture.ecosystem.title")) + "\n      ")]), i("li", {
                    class: [2 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 2
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("architecture.banking.title")) + "\n      ")]), i("li", {
                    class: [3 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 3
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("architecture.exchange.title")) + "\n      ")]), i("li", {
                    class: [4 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 4
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("architecture.blockchain.title")) + "\n      ")]), i("li", {
                    class: [5 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 5
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("architecture.api.title")) + "\n      ")])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 1 === t.activetab
                        , expression: "activetab === 1"
                    }]
                    , staticClass: "ecosystem"
                }, [i("article", [i("p", [t._v("\n          " + t._s(t.$t("architecture.ecosystem.description")) + "\n        ")]), t._m(0)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 2 === t.activetab
                        , expression: "activetab === 2"
                    }]
                    , staticClass: "banking"
                }, [i("article", [i("p", [t._v("\n          " + t._s(t.$t("architecture.banking.description")) + "\n        ")]), t._m(1)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 3 === t.activetab
                        , expression: "activetab === 3"
                    }]
                    , staticClass: "exchange"
                }, [i("article", [i("p", [t._v("\n          " + t._s(t.$t("architecture.exchange.description")) + "\n        ")]), t._m(2)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 4 === t.activetab
                        , expression: "activetab === 4"
                    }]
                    , staticClass: "blockchain"
                }, [i("article", [i("p", [t._v("\n          " + t._s(t.$t("architecture.blockchain.description")) + "\n        ")]), t._m(3)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 5 === t.activetab
                        , expression: "activetab === 5"
                    }]
                    , staticClass: "api"
                }, [i("article", [i("p", [t._v("\n          " + t._s(t.$t("architecture.api.description")) + "\n        ")]), t._m(4)])])])])
            }
            , it = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("52e4")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("d01d")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("1fa4")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("d01d")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("ef10")
                        , alt: ""
                    }
                })])
            }]
            , nt = {
                data: function () {
                    return {
                        activetab: 1
                    }
                }
                , methods: {}
            }
            , st = nt
            , at = Object(u["a"])(st, et, it, !1, null, "2a3c16e3", null)
            , rt = at.exports
            , ot = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "convenient"
                    , attrs: {
                        id: "convenient"
                    }
                }, [i("h2", [t._v(t._s(t.$t("convenient.title")))]), i("div", {
                    staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("ul", {
                    staticClass: "button"
                }, [i("li", {
                    class: [1 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 1
                        }
                    }
                }, [t._v("\n          " + t._s(t.$t("convenient.stakeholder.title")) + "\n        ")]), i("li", {
                    class: [2 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 2
                        }
                    }
                }, [t._v("\n          " + t._s(t.$t("convenient.individuals.title")) + "\n        ")]), i("li", {
                    class: [3 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 3
                        }
                    }
                }, [t._v("\n          " + t._s(t.$t("convenient.entities.title")) + "\n        ")])])]), i("div", {
                    staticClass: "group__item"
                }, [i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 1 === t.activetab
                        , expression: "activetab === 1"
                    }]
                    , staticClass: "stakeholder"
                }, [i("article", [i("ul", t._l(t.$t("convenient.stakeholder.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 2 === t.activetab
                        , expression: "activetab === 2"
                    }]
                    , staticClass: "individuals"
                }, [i("article", [i("ul", t._l(t.$t("convenient.individuals.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 3 === t.activetab
                        , expression: "activetab === 3"
                    }]
                    , staticClass: "entities"
                }, [i("article", [i("ul", t._l(t.$t("convenient.entities.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])])])])])
            }
            , ct = []
            , lt = {
                data: function () {
                    return {
                        activetab: 1
                    }
                }
                , methods: {}
            }
            , pt = lt
            , dt = Object(u["a"])(pt, ot, ct, !1, null, "fffd010e", null)
            , ut = dt.exports
            , mt = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "mvp"
                    , attrs: {
                        id: "mvp"
                    }
                }, [i("h2", [t._v(t._s(t.$t("mvp.title")))]), i("div", {
                    staticClass: "container"
                }, [i("ul", [i("li", {
                    class: [1 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 1
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("mvp.features.title")) + "\n      ")]), i("li", {
                    class: [2 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 2
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("mvp.wallet.title")) + "\n      ")]), i("li", {
                    class: [3 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 3
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("mvp.payments.title")) + "\n      ")]), i("li", {
                    class: [4 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 4
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("mvp.deposits.title")) + "\n      ")]), i("li", {
                    class: [5 === t.activetab ? "active" : ""]
                    , on: {
                        click: function (e) {
                            t.activetab = 5
                        }
                    }
                }, [t._v("\n        " + t._s(t.$t("mvp.management.title")) + "\n      ")])]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 1 === t.activetab
                        , expression: "activetab === 1"
                    }]
                    , staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("article", [i("ul", t._l(t.$t("mvp.features.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), t._m(0)]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 2 === t.activetab
                        , expression: "activetab === 2"
                    }]
                    , staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("article", [i("ul", t._l(t.$t("mvp.wallet.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), t._m(1)]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 3 === t.activetab
                        , expression: "activetab === 3"
                    }]
                    , staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("article", [i("ul", t._l(t.$t("mvp.payments.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), t._m(2)]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 4 === t.activetab
                        , expression: "activetab === 4"
                    }]
                    , staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("article", [i("ul", t._l(t.$t("mvp.deposits.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), t._m(3)]), i("div", {
                    directives: [{
                        name: "show"
                        , rawName: "v-show"
                        , value: 5 === t.activetab
                        , expression: "activetab === 5"
                    }]
                    , staticClass: "group"
                }, [i("div", {
                    staticClass: "group__item"
                }, [i("article", [i("ul", t._l(t.$t("mvp.management.list"), function (e, n) {
                    return i("li", {
                        key: "item" + n
                    }, [t._v("\n              " + t._s(e.description) + "\n            ")])
                }), 0)])]), t._m(4)]), i("div", {
                    staticClass: "download"
                }, [i("a", {
                    staticClass: "button"
                    , attrs: {
                        href: "http://acss.tech/media/acss-c-wallet.apk"
                        , download: ""
                    }
                }, [t._v(t._s(t.$t("mvp.button")))]), i("ul", {
                    staticClass: "app"
                }, [i("li", [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , viewBox: "0 0 50 50"
                        , width: "25px"
                    }
                }, [i("path", {
                    attrs: {
                        d: "M44.527344 34.75c-1.078125 2.394531-1.597656 3.464844-2.984375 5.578125-1.941406 2.953125-4.679688 6.640625-8.0625 6.664063-3.011719.027343-3.789063-1.964844-7.878906-1.929688-4.085938.019531-4.9375 1.96875-7.953125 1.9375-3.386719-.03125-5.976563-3.351562-7.917969-6.300781-5.429688-8.269531-6.003906-17.964844-2.648438-23.121094 2.375-3.65625 6.128907-5.804687 9.65625-5.804687 3.59375 0 5.851563 1.972656 8.820313 1.972656 2.882812 0 4.636719-1.976563 8.792969-1.976563 3.140625 0 6.460937 1.710938 8.835937 4.664063C35.421875 20.691406 36.683594 31.78125 44.527344 34.75zM31.195313 8.46875C32.707031 6.527344 33.855469 3.789063 33.4375 1c-2.464844.167969-5.347656 1.742188-7.03125 3.78125-1.527344 1.859375-2.792969 4.617188-2.300781 7.285156 2.691406.085938 5.476562-1.519531 7.089844-3.597656z"
                    }
                })])]), i("li", [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , viewBox: "0 0 50 50"
                        , width: "25px"
                    }
                }, [i("path", {
                    attrs: {
                        d: "M16.28125.03125c-.128906.0234375-.261719.046875-.375.125-.457031.308594-.558594.949219-.25 1.40625l2.15625 3.21875C14.480469 6.546875 11.996094 9.480469 11.1875 13h27.625c-.808594-3.519531-3.292969-6.453125-6.625-8.21875l2.15625-3.21875c.308594-.457031.207031-1.097656-.25-1.40625-.460937-.308594-1.097656-.1757813-1.40625.28125l-2.375 3.5C28.664063 3.335938 26.875 3 25 3s-3.664062.335938-5.3125.9375l-2.375-3.5c-.230469-.34375-.648437-.4804688-1.03125-.40625zM19.5 8c.828125 0 1.5.671875 1.5 1.5 0 .832031-.671875 1.5-1.5 1.5-.832031 0-1.5-.667969-1.5-1.5 0-.828125.667969-1.5 1.5-1.5zm11 0c.832031 0 1.5.671875 1.5 1.5 0 .832031-.667969 1.5-1.5 1.5-.828125 0-1.5-.667969-1.5-1.5 0-.828125.671875-1.5 1.5-1.5zM8 15c-1.65625 0-3 1.34375-3 3v14c0 1.65625 1.34375 3 3 3 .351563 0 .6875-.074219 1-.1875v-19.625C8.6875 15.074219 8.351563 15 8 15zm3 0v22c0 1.652344 1.347656 3 3 3h22c1.652344 0 3-1.347656 3-3V15zm31 0c-.351562 0-.6875.074219-1 .1875v19.625c.3125.109375.648438.1875 1 .1875 1.65625 0 3-1.34375 3-3V18c0-1.65625-1.34375-3-3-3zM15 42v4c0 2.207031 1.792969 4 4 4 2.207031 0 4-1.792969 4-4v-4zm12 0v4c0 2.207031 1.792969 4 4 4 2.207031 0 4-1.792969 4-4v-4z"
                    }
                })])]), i("li", [i("svg", {
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg"
                        , viewBox: "0 0 50 50"
                        , width: "25px"
                    }
                }, [i("path", {
                    attrs: {
                        d: "M46 4.867188l-21 2.625V24h21zm-23 2.875l-19 2.375V24h19zM4 26v13.882813l19 2.375V26zm21 0v16.507813l21 2.625V26z"
                    }
                })])])])])])])
            }
            , ft = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("4760")
                        , alt: ""
                    }
                })])])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("5c95")
                        , alt: ""
                    }
                })])])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("745f")
                        , alt: ""
                    }
                })])])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("57ce")
                        , alt: ""
                    }
                })])])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group__item"
                }, [n("figure", [n("img", {
                    attrs: {
                        src: i("0cf1")
                        , alt: ""
                    }
                })])])
            }]
            , vt = {
                data: function () {
                    return {
                        activetab: 1
                    }
                }
                , methods: {}
            }
            , ht = vt
            , gt = Object(u["a"])(ht, mt, ft, !1, null, "08ea42ba", null)
            , yt = gt.exports
            , bt = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "team"
                    , attrs: {
                        id: "team"
                    }
                }, [i("h2", [t._v(t._s(t.$t("team.title")))]), t._m(0), t._m(1)])
            }
            , _t = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group"
                }, [n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("07c4")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Vladimir Budarin")]), n("li", [t._v("CTO, ICT Expert, Blockchain")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("f4bd")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Pavel Shmulev")]), n("li", [t._v("\n        Marketer, Teamlead, ICT Expert\n      ")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("2d9e")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Muslim Ibragimov")]), n("li", [t._v("Security Service")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("26cf")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Andrey Tolkachev")]), n("li", [t._v("Designer")])])])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("div", {
                    staticClass: "group"
                }, [n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("07b7")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Dar'ya Kotova")]), n("li", [t._v("Copywriter")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("f427")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Dmitriy Nikiforov")]), n("li", [t._v("Frontend developer")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("1c82")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Aleksey Ivlev")]), n("li", [t._v("Backend developer")])]), n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("1195")
                        , alt: ""
                    }
                })])]), n("li", [t._v("Name Surname")]), n("li", [t._v("Specialty")])])])
            }]
            , Ct = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , At = Ct
            , wt = Object(u["a"])(At, bt, _t, !1, null, "468e04b9", null)
            , kt = wt.exports
            , xt = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "documents"
                    , attrs: {
                        id: "documents"
                    }
                }, [i("h3", [t._v(t._s(t.$t("documents.title")))]), i("ul", [i("li", [t._m(0), i("a", {
                    attrs: {
                        href: "#"
                    }
                }, [t._v(t._s(t.$t("documents.button")))])]), i("li", [t._m(1), i("a", {
                    attrs: {
                        href: "#"
                    }
                }, [t._v(t._s(t.$t("documents.button")))])])])])
            }
            , St = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("cec7")
                        , alt: ""
                    }
                })])
            }, function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("figure", [n("img", {
                    attrs: {
                        src: i("8c05")
                        , alt: ""
                    }
                })])
            }]
            , Et = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , Ot = Et
            , Bt = Object(u["a"])(Ot, xt, St, !1, null, "4a4b60db", null)
            , Mt = Bt.exports
            , Tt = function () {
                var t = this
                    , e = t.$createElement
                    , i = t._self._c || e;
                return i("section", {
                    staticClass: "partners"
                    , attrs: {
                        id: "partners"
                    }
                }, [i("h3", [t._v(t._s(t.$t("partners.title")))]), t._m(0)])
            }
            , Pt = [function () {
                var t = this
                    , e = t.$createElement
                    , n = t._self._c || e;
                return n("ul", [n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("7df1")
                        , alt: ""
                    }
                })])]), n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("52f9")
                        , alt: ""
                    }
                })])]), n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("f632")
                        , alt: ""
                    }
                })])]), n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("928a")
                        , alt: ""
                    }
                })])]), n("li", [n("figure", [n("img", {
                    attrs: {
                        src: i("d6fa")
                        , alt: ""
                    }
                })])])])
            }]
            , Nt = {
                data: function () {
                    return {}
                }
                , methods: {}
            }
            , jt = Nt
            , Ft = Object(u["a"])(jt, Tt, Pt, !1, null, "40349c0e", null)
            , zt = Ft.exports
            , It = {
                data: function () {
                    return {}
                }
                , components: {
                    headerNav: y
                    , footerNav: k
                    , product: M
                    , scope: z
                    , platform: V
                    , figures: Z
                    , banking: tt
                    , architecture: rt
                    , convenient: ut
                    , mvp: yt
                    , team: kt
                    , documents: Mt
                    , partners: zt
                }
            }
            , Dt = It
            , Gt = (i("5c0b"), Object(u["a"])(Dt, s, a, !1, null, null, null))
            , Lt = Gt.exports
            , Qt = (i("4917"), i("ac6a"), i("a925"));

        function Vt() {
            var t = localStorage.language;
            return t
        }

        function Kt() {
            var t = (navigator.language || navigator.browserLanguage).toLowerCase().slice(3);
            return t
        }

        function Rt() {
            var t = i("49f8")
                , e = {};
            return t.keys().forEach(function (i) {
                var n = i.match(/([A-Za-z0-9-_]+)\./i);
                if (n && n.length > 1) {
                    var s = n[1];
                    e[s] = t(i)
                }
            }), e
        }
        n["a"].use(Qt["a"]);
        var Yt = new Qt["a"]({
                locale: Vt() || Kt() || "us"
                , fallbackLocale: "us"
                , messages: Rt()
            })
            , Jt = i("f13c")
            , Ut = i.n(Jt);
        n["a"].use(Ut.a, {
            duration: 600
        }), n["a"].config.productionTip = !1, new n["a"]({
            i18n: Yt
            , render: function (t) {
                return t(Lt)
            }
        }).$mount("#app")
    }
    , 5707: function (t, e, i) {
        t.exports = "img/hero__glow.d53494d4.svg"
    }
    , "57ce": function (t, e, i) {
        t.exports = "img/mvp-4.0c5b8c40.png"
    }
    , "5c0b": function (t, e, i) {
        "use strict";
        var n = i("5e27")
            , s = i.n(n);
        s.a
    }
    , "5c95": function (t, e, i) {
        t.exports = "img/mvp-2.68ecc647.png"
    }
    , "5e27": function (t, e, i) {}
    , "745f": function (t, e, i) {
        t.exports = "img/mvp-3.b6f61c1e.png"
    }
    , 7704: function (t) {
        t.exports = {
            header: {
                description: "Automatic Cross-chain Settlement System"
                , nav: {
                    list: [{
                        title: "Продукт"
                        , hash: "#product"
                    }, {
                        title: "Возможности"
                        , hash: "#scope"
                    }, {
                        title: "Платформа"
                        , hash: "#architecture"
                    }, {
                        title: "Команда"
                        , hash: "#team"
                    }, {
                        title: "Документы"
                        , hash: "#documents"
                    }]
                }
            }
            , hero: {
                title: "Финансовая экосистема будущего"
                , description: "Уникальная криптобанковская система, работающая виртуально. Она предназначена для моментальных финансовых операций – транзакций при помощи современной технологии блокчейн и максимально удобных бесконтактных платежей."
            }
            , product: {
                title: "Новое слово в мировом банкинге"
                , list: [{
                    title: "Специальный децентрализированный виртуальный криптобанк ACSS оказывает такие услуги как: моментальные бесконтактные платежи во всех странах мира, можно оплатить как услуги, так и товары, для проведения мультивалютных операций. В криптобанке присутствует встроенная система, предназначенная для обмена как фиатом, так и криптовалютами."
                }, {
                    title: "Работа проекта ACSS осуществляется без помощи посредников, имеется своя криптовалютная биржа. Помимо этого, присутствует межбанковская экосистема. Она основывается на технологии блокчейн, которая призвана объединять все процессы обслуживания клиентов и процедуры финансирования."
                }, {
                    title: "Проект является очень простым и доступным крипто инструментом, имеющим самые минимальные комиссии, он осуществляет полностью безопасные транзакции при помощи смарт-контактов. Благодаря внутренней экосистеме есть отличная возможность создавать разные социальные и финансовые учреждения, а затем управлять ими при помощи собственного децентрализованного реестра."
                }]
            }
            , scope: {
                title: "Мы убираем все ограничения в криптомире"
                , description: "Стать свободным в выборе платежной системы, избавиться от запретов в криптомире можно при помощи децентрализованной криптобанковской экосистемы, работающей виртуально при помощи технологии блокчейн, осуществляющей моментальные оплаты при помощи бесконтактных платежей."
                , message: "Извините, проблема в воспроизведении этого видео. Пожалуйста, попробуйте использовать другой браузер."
            }
            , platform: {
                title: "Существующая финансовая модель системы и бирж криптовалют на сегодняшний день"
                , description: "Подробнее рассмотрим, какие комиссии существуют в работе нашей экосистемы:"
                , group: [{
                    title: "Криптобанк"
                    , description: "Берет комиссию 0,5 % от общей суммы оплаты."
                }, {
                    title: "Банки"
                    , description: "Работа банка-эмитента и банка-эквайера оплачивается комиссией в размере от 2 до 4% от общей суммы платежа."
                }, {
                    title: "Криптовалютная биржа"
                    , description: "Работа криптовалютных бирж, таких, как Kraken, Bitfinex, Binance, Bittrex Poloniex, оплачивается в размере от 2 до 4% от оплаты."
                }, {
                    title: "Децентрализованный криптобанк"
                    , description: "При помощи системы умных контактов клиенты имеют возможность осуществлять работу напрямую с CryptoBank. Это помогает сэкономить на транзакциях, а также комиссиях более, чем 8,7% от общей суммы платежей."
                }, {
                    title: "Платежная система"
                    , description: "При осуществлении платежей через системы Alipay, MasterCard,Visa, PayPal взимается комиссия в размере от 2% до 4% от общей суммы."
                }, {
                    title: "Умный контракт"
                    , description: "За осуществление транзакции Криптобанка берется 0,5%, Криптовалютной биржи - 0,1%."
                }]
            }
            , figures: {
                title: "О том, что такое централизованные и децентрализованные платформы, в цифрах"
                , description: "Чтобы понять работу платформ, необходимо убедиться в их производительности. Для этого можно обратиться к цифрам."
                , first: {
                    list: [{
                        description: "Комиссия криптообменная равна всего 0,2% от суммы платежа."
                    }, {
                        description: "Производительность - 91, 65%."
                    }, {
                        description: "Комиссия банка равна 2,4%."
                    }, {
                        description: "Комиссия Криптобанка всего 0,5% от суммы платежа."
                    }, {
                        description: "Для платежных систем предусмотрена комиссия 2,4%."
                    }]
                }
                , second: {
                    list: [{
                        description: "Комиссия криптообменная составляет 0,1%."
                    }, {
                        description: "Производительность системы достигает 99,4%."
                    }, {
                        description: "Комиссия Криптобанка также 0,5%."
                    }]
                }
                , conclusion: {
                    title: "Заключение"
                    , description: "Благодаря полному отсутствию посредников, платформа ACSS является экономически выгодной аж на 7,75%. Таким образом можно спокойно высвободить более, чем 36 миллиардов долларов на рынке криптовалют в год."
                }
            }
            , banking: {
                centralized: {
                    title: "Банковская централизованная система."
                    , list: [{
                        title: "Централизованная платформа"
                        , description: "Такая система отличается вовлечением в процесс целого ряда брокеров. Они не обеспечивают возможности прозрачности сделок и берут повышенные комиссии не только с торговцев, но и с филиалов."
                    }, {
                        title: "Повышенные комиссии"
                        , description: "Финансовые системы, которые основаны лишь на собственных интересах владельцев, обеспечивают расходы до 10% среднего бюджета в виде комиссий."
                    }, {
                        title: "Высокие расходы"
                        , description: "Управление, оказание услуг и ведение учета - такие финансовые решения, а также платежные системы обходятся слишком дорого для бизнес-счетов."
                    }, {
                        title: "Отсутствие анонимности и масштабируемости"
                        , description: "Банковские централизованные системы устарели, поэтому становится сложным внедрять современные технологические решения. Анонимность транзакций больше не обеспечивается юридическими лицами."
                    }]
                }
                , decentralized: {
                    title: "ACSS Децентрализованная система."
                    , list: [{
                        title: "Децентрализованная платформа"
                        , description: "Помогает создать полностью прозрачную и автоматизированную экосистему, которая была создана при помощи специальной инженерной технологии. Экосистема успешно соединяет брокеров, при этом она использует смарт-системы для ведения честных сделок."
                    }, {
                        title: "Более низкие комиссии"
                        , description: "Система ACSS за оказание услуг берет примерно 0,5% от суммы сделок, при этом постепенно снижая проценты в соответствии с активами в справедливой торговле."
                    }, {
                        title: "Бесплатна в использовании"
                        , description: "Проект ACSS предусматривает готовые и при этом бесплатные финансовые услуги своим клиентам, а также экосистема ничего не стоит для осуществления коммуникаций с партнерами."
                    }, {
                        title: "Анонимность и масштабируемость"
                        , description: "Благодаря разнообразию счетов и тарифов есть возможность обеспечивать полную анонимность использования операций платежей криптовалютных. При этом осуществляется подключение в массовом, глобальном масштабе."
                    }]
                }
            }
            , architecture: {
                title: "Архитектура платформы"
                , ecosystem: {
                    title: "Экосистема"
                    , description: "DApps и другие типы внешних служб будут подключаться к ACSS с использованием уникальных API. Блокчейн использует протокол «Json-RPC API» для взаимодействия с любыми типами монет и смарт-контрактами внутри сети. Мы используем web-3 и балансировщик нагрузки для их сортировки. Стабильные токены обмениваются резервными копиями данных в реальном времени с системой криптовалюты, поддерживаемой обменом в реальном времени."
                }
                , banking: {
                    title: "Банковская система"
                    , description: "Банковская экосистема ACSS основана на собственном и гибком взаимодействии или связи между основными бизнес-процессами (сервис, управление и соответствие), корпоративными информационными системами (такими как учетные данные, управление DApps и интеграция клиентов) и собственным внутренним уровнем обработки данных (в блокчейне). , документация, история передачи и др.)."
                }
                , exchange: {
                    title: "Система обмена"
                    , description: "Гибридные биржи должны стать золотой серединой, которая объединит преимущества централизованного обмена, такие как сотрудничество с крупными инвесторами и доверие многих пользователей, с преимуществами децентрализованного обмена, такими как безопасное хранение и отсутствие подчинения вышестоящему органу, полная анонимность."
                }
                , blockchain: {
                    title: "Блокчейн"
                    , description: "ACSS имеет два разных типа цепочки блоков: открытый и безопасный. 1. Целью собственной сети с открытым блокчейном является разработка альтернативного протокола для построения децентрализованных приложений, представляющего собой комплексный набор компромиссов, который будет очень полезен для широкого класса децентрализованных приложений, с особым акцентом на ситуации, когда скорость времени разработки, безопасность для данных важны, и очень важны возможности редко используемых приложений, а также способность различных приложений взаимодействовать очень эффективно. Сеть ACSS делает это, создавая, по сути, конечный абстрактный фундаментальный уровень: цепочку блоков со встроенным языком программирования, полным по Тьюрингу, позволяя любому писать умные контракты и децентрализованные приложения, где они могут формировать свои собственные произвольные правила для владения, форм транзакций и функций перехода состояний. 2. Защищенный блокчейн включает в себя все преимущества открытого блокчейна с целью предоставления безопасных услуг в цепочке для бизнеса. На основе безопасной цепочки блоков мы запустим смарт-контракты Stabletokens, хранилище данных KYC и широкий спектр бизнес-приложений. Обратное соединение обмена криптовалюты с помощью lifefeed будет обслуживать умные контракты по фактическим торговым данным."
                }
                , api: {
                    title: "API"
                    , description: "API-управление - это технологическое соединение базовых сервисов ACSS и родной масштабируемой платформы для подключения других сервисов партнеров. Решения по очистке данных на основе блокчейнов работают с облегченным протоколом JSON-RPC API удаленных процедур через web-3 и балансировщики нагрузки. Будущее развивающееся решение атомных свопов обеспечит возможность взаимодействия с любым семейством монет и смарт-контрактами."
                }
            }
            , convenient: {
                title: "Платформа ACSS - это выгода и удобство для каждого потребителя, как для частных, так и юридических лиц"
                , stakeholder: {
                    title: "Для юридических лиц"
                    , list: [{
                        description: "Абсолютная надежность и полная безопасность быстрых переводов без ограничений по сумме с комиссией всего 0.5%."
                    }, {
                        description: "Наличие собственного криптообмена способствует обмену и выводу криптовалют всего за 0,1% от общей суммы."
                    }, {
                        description: "Отсутствие скрытых платежей, наличие самых низких комиссий."
                    }, {
                        description: "Возможность кредитования как юридических, так и физических лиц."
                    }, {
                        description: "Самые выгодные цены для моментальной покупки, обмена криптовалют."
                    }, {
                        description: "Инвестиционный фонд поможет реализовать любые проекты, добычу полезных ископаемых и многое другое."
                    }, {
                        description: "Собственная система межбанковских финансовых каналов (аналог SWIFT)."
                    }, {
                        description: "Собственные крипто-банкоматы и интеграция с существующими. "
                    }, {
                        description: "Онлайн робот-консультант, который сообщит клиенту, когда покупать или продавать криптовалюту по более выгодному курсу. "
                    }]
                }
                , individuals: {
                    title: "Для частных лиц"
                    , list: [{
                        description: "Мгновенные умные договорные платежи за любые услуги с использованием криптовалюты без снятия денег с вашего кошелька."
                    }, {
                        description: "Бесконтактные способы оплаты для мобильных устройств на базе NFCtechnology."
                    }, {
                        description: "Хорошо развитая система лояльности, бонусы и возвратные операции, хорошие депозитные ставки."
                    }, {
                        description: "Автономное приложение будет доступно по всему миру, если на вашем устройстве работает мобильный интернет."
                    }, {
                        description: "Обмен криптовалюты NFC на NFC."
                    }]
                }
                , entities: {
                    title: "Для юридических лиц"
                    , list: [{
                        description: "Безналичные покупки криптовалюты по хорошей цене."
                    }, {
                        description: "Легальное вложение корпоративных средств в криптопроекты, приобретение токенов, участие в ICO."
                    }, {
                        description: "Зарплатные проекты."
                    }, {
                        description: "Снятие наличных из любой точки мира."
                    }]
                }
            }
            , mvp: {
                title: "Приложение MVP"
                , features: {
                    title: "Функции"
                    , list: [{
                        description: "Децентрализованный кошелек."
                    }, {
                        description: "Получите бесплатную виртуальную мультивалютную карту сразу после регистрации."
                    }, {
                        description: "Мгновенные платежи и транзакции криптовалюты в фиат."
                    }, {
                        description: "Программы лояльности и кэшбэка для каждой транзакции, повышенные ставки кэшбэка для токенов."
                    }, {
                        description: "Возможность анонимно использовать экосистему ACSS."
                    }, {
                        description: "Интеграция с внешними кошельками или сервисами, такими как PayPal, Gyft, WeChat, Alipay, PayTM, Visa, MasterCard). MasterCard Worldbonuses."
                    }, {
                        description: "Варианты бесконтактных платежей, такие как QR, ApplePay, SamsungPay, AndroidPay и многие другие."
                    }]
                }
                , wallet: {
                    title: "Бумажник"
                    , list: [{
                        description: "Мультивалютный, криптовалютный."
                    }, {
                        description: "Децентрализация и хранение средств на устройстве пользователя."
                    }, {
                        description: "Анонимная и неанонимная торговля."
                    }, {
                        description: "Связывание криптовалют."
                    }, {
                        description: "Связывание существующих банковских карт."
                    }, {
                        description: "Отчеты о времени и расходах."
                    }, {
                        description: "Система предложений по хранению криптовалют и торговле ими."
                    }]
                }
                , payments: {
                    title: "NFC and QR payments"
                    , list: [{
                        description: "Платите по всему миру с минимальной комиссией."
                    }, {
                        description: "Нет необходимости ждать в очереди заказов на транзакции."
                    }, {
                        description: "Наш встроенный обмен обеспечивает мгновенные возможности автоматического обмена."
                    }, {
                        description: "Гибкие учетные системы."
                    }, {
                        description: "Нет географических и правовых ограничений."
                    }, {
                        description: "NFC бесконтактные платежи."
                    }, {
                        description: "Удобные и защищенные от фишинга платежи через QR."
                    }]
                }
                , deposits: {
                    title: "Депозиты"
                    , list: [{
                        description: "Удобный интерфейс финансовых вкладов."
                    }, {
                        description: "Индивидуальные анонимные и прозрачные децентрализованные аккаунты."
                    }, {
                        description: "Интерактивный набор настраиваемых отчетов."
                    }, {
                        description: "Гибкая система лояльности, бонусов и возврата денег."
                    }, {
                        description: "Мультивалютная интеграция с криптовалютами и фиатами."
                    }, {
                        description: "Система торговых предупреждений."
                    }, {
                        description: "Внутренняя система стабильной валюты."
                    }, {
                        description: "Счета связаны с виртуальной картой."
                    }]
                }
                , management: {
                    title: "Управление и отчетность"
                    , list: [{
                        description: "Онлайн финансовая отчетность."
                    }, {
                        description: "Отчет по депозитам криптовалют."
                    }, {
                        description: "Анализ доходности портфеля."
                    }, {
                        description: "Анализ расходов и возврат средств."
                    }, {
                        description: "Индивидуальный финансовый менеджмент."
                    }, {
                        description: "Удобная настройка системы."
                    }, {
                        description: "Отчетность для бизнеса."
                    }, {
                        description: "Удобная нативная визуализация отчетности."
                    }]
                }
                , button: "Скачать"
            }
            , team: {
                title: "Команда"
            }
            , documents: {
                title: "Документы"
                , button: "Открыть документ"
            }
            , partners: {
                title: "Партнеры"
            }
        }
    }
    , "7df1": function (t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAA2CAMAAAD06lt6AAAAtFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oK74hAAAAO3RSTlMA8/LHC7yW4wj7t+nVZoARHZL3wZ5YSkQ1ItpfqYqFQDMOrqNQGe8CFXgsJDgwBM7Kspp0bzwo3lOPfZDw0gsAAAVDSURBVFjD7Zlpk9owDIYNJOQiBwkQjnAl3MdyLbDs+///VyUn7LCdWZi20DJt9cG2nIAfy7IkBmHlflZU8SjBT0tJPEry+FkpiEz+M/1n+ieYlt20C3XxhQycl9/MlKDO3RoH8YUEUH4zkwP0qTMxF19IBP03M3WApmRqUOsl1mogz8sWxTYTa4X+lJgabTZjWNZFdyc6miltO6yMtOkjmMrGDlHGtABiDcwSo8C9iXWhpOZ0MZHgwJj2EPgaDDJdw0CygfkApiJomZ3YENN4xGAmekJMsSHHrqLCTZ4ATnCFhzdWC3zgdDNKObYV7EcwjcUaXodwGujQhIIinyg/U/HhTy468lVhM3eIkN5rVuK4gtUjmFwhjFFAS83wyjPYCtHGhEYryDekj5cM4ZuCmWbkbugSk5bEcbFaewATX7s5QEx63qCJLepsp6Fcf8eMxpjaPXbYy7mlEG/ENG76gmTxAH+K4QpehONTF6gE2Eowjx82YSZHH3LddVrk7FhrgazjwWpN4ev3Z3pVFe46Khumu0b+nVVbdbnrl3O56VDd87ianmxNnZPR1CUND+v8qPLyJ/NdgsmT5eBDEcHd4rivWfdg6kJVfpSp2uutYC16vSaSXr1e7w1ikBi7odD30RWmrlMul1viO3mJoTU+zeg/nu9cvtC+jCnSSdO7hF46NL9mqoAlvxefZIsomv9q/TTj1MVFRYnzVH/XJf3EycibLgnXuBKfhorSheGm1kg7kbPSXmE9G2aW6n+4unuTiURdZkxDyADCuSJiMHGNidslKtROTMAaENkRvtWhryFd4zgdblwavmd2taY8cHzgdJvJHWZME18GE2ukacDbDTv1uRsZhKKhRW44EHoFuaQlFIv0DUKOTaN12cKBt7hYRKr83Gmww+YmE8uZqUWOqknvl/50i4nTrSMj0JFTiYzZbVlganmyEy/ehU0aOEhmZyBs9K4yNeYXTIa0EzGtaG/9CLhtJyZXm81SjiZ0HJlT6j5R1DgHznifoQa/6PIFCkr0EK/XmUreB9MQ2EtrqWStavrqbX+KYdt2a34YZ0wm69UG7arG7rlgJhpHGHk0k7Rse+FNrp8d1h9ML/sDX2h5Ano4qNdu3LtQ3rtQ7toZioypJiE6k0umNyXVFL/JZ2ffiE8W3j7FpxbwEQuNG/FJqwvGQRCB874CsN5mnV2myl7ZJWRlhCCG5rJlR5GG0/U4Xtfgh9/F8Q4NWakZ1+P44Bxm1XVHhnEn9ZNqkOpzh5zVc5Zi3H/dqI4uvbyyimb/zu/g/0wXcrsu+FFRzfsy3a4LbovhP47psi74LErWu+7lFDeX0s/6yeR+TJdx3Iz5igcUEM3ZDoh0IfRpE1A5a02LjRGa/YaPlcfxuCi4BUY75g6AUvVeTJf5bgtaPIEn+vCPxYCj+ktwqocY6fxQi8tYHSsRInofoKaArW1xOLWMw75QvjeTCs4oiRAIeJDnZc9uXENIdoJNluTMkDMEUWg879CoR7kITUHyCDuJAKKRppbTmallWc01M7UxluQMNk6ZyngRqdg+rOlD/EnM4E1ZVbBlpg2n5ZPn2dgz00RC8+lmTG144iy2idUdmc51AclxrVUkUyVjeuf1yynTMGOKz0wNlGg3SVcoA/lFd2O6rAtECLiSSaWWVzwAcSlAU/o+kTDTipnAoypgAaGYAxsT6t2YLusC5kjLAp5wqnyciToV03fCdRTyLodJuNnJwmGRBB3axNhzVNV+UL4boPoM+e5SVFhPkYM/MW0aT8f0LLXK3870jP+9PuF/1N8ASiIQdG4DW+kAAAAASUVORK5CYII="
    }
    , "8c05": function (t, e, i) {
        t.exports = "img/threepager__card.d7dfd9e8.svg"
    }
    , "928a": function (t, e, i) {
        t.exports = "img/partners-logo-3-gold.4486f7c8.png"
    }
    , "958a": function (t, e, i) {
        t.exports = "img/cube__dark.762c2016.svg"
    }
    , a5bc: function (t, e, i) {
        t.exports = "media/191201241019ed5d9f712440.55c04fc2.mp4"
    }
    , bf53: function (t, e, i) {
        t.exports = "img/cube__blue.bb6bd7b1.svg"
    }
    , cec7: function (t, e, i) {
        t.exports = "img/onepager__card.115c9779.svg"
    }
    , d01d: function (t, e, i) {
        t.exports = "img/shema.1aed3ce8.png"
    }
    , d6fa: function (t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAAoCAMAAADqmLl5AAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMAvEOUDZBHKLo07T8c46cjGBPzelk6BayH3tJv2c62IBD5wlAuxqCASujKZAl/d15VA7CYajhzBRfNqQAAA8pJREFUWMPtmNuSojAQQDuI4uAIAl6YQXEQFe+3ufT//9mGJCaBCWvtw1Ztbc15kCTGcGjaJgpmvDB052DmmobhNoC/ToaIT2BmjJQ5/HXCf8AhL4piAA0Mi+Jow//G0rIs0XyjzUE17veRgDZ8qDGyrJFozun7PDZisryT156lGIPAUWNLgBkixsCY0uYedOZ0xC3XzmljZcrcIbcvE4j7iMmv984TapxBsBYDfCYpj0s5PgSdZxTn3tDjAmr06WDGrn6HehJ39Mk91EhA0FJjLwDd8tjnk80O2OYOBGq8IKVLGx9Yd1CT39aE4s2wRN7pNu1MCSMRDvgO4DY6YP4bB0zoLJODQkaqA7pDLntdsUCEzQ54GDQ7oDN57LCSCsrhvcd4Ew4Ks0N3lBkdBA8diFSQDpINc8hS1tkujA6rMlfd0OzQJ1gy3ZkddAULzA45j8MgLjufX0aHKTBFs4Nrl+LorH/nsNAV6jk58bmDD+xTa6ODC+Os0QFhwOrLzOigFF6eVd+ckxvYFMcD3IwO2zGMmh18OBcngNdGhwOLQswLo23Iyae7A2PS5ABRo4PDm81x+ECNvXJQ8AJ9UV+gj2+1GqkDpCwxarAKqx72PRBcyuCbzoYnEHgVh4iQrriYhBBS3TXYN0LW1/LhNSEkghotQm4Bb8aEpLIIOl1CjveORTQ2IDirMQ9++OGHH/5l9nvVHolCffm6gsBvt1pxQV/asgoGEe1SVFW/nmPaT3qgYZ3GenfTfm91Kk+iY7lozio0ZvpWwxN7PwcEQxSo538kBrbaU4UTXvQ9dwBqwo7v4uV1qI11SlXxVY1PxINtohzGtm230KKv8rKOOLRLDnDHwZT2g3Om/Qx9xTeQi2zxK7jae9zacuydLbpsoVd1uKGLjnSQxLjUuxFaUMXHCY8/xnJspjlcsGDHBCMVB3GOKdoVB4JO5n53aOOo6rCsO4h7uMfE6LAW6z1jqjkMxD07VBy6CEtMHzmccOGVXDSHVafTsY7oHowOKwxkvJRDQj9yWWEENYdniPH40CF0S06aA+fmg9FhIa7Z0RzaIo0jqDvM2QdOD+6F7OpxyEMXwOzgoS/uRbcahwLbAN/jANewnz5w2Bjz4RPTBocEz2Kf2a7lA8FPgwP7sf7Hcbjx1BuaHQbI/mALXnCuHNjZD+iWDiFIpuhz7Wrme2hVv6pZv2QaqPqwg3LBTPsPy9VrVI64a60Q93ot6vFzLcaQrrUrJAOxQQ1AIycVpQ6Z1hwCEvNav0uUKbFB8eltMezqy5yJw+MxC34BoMzOkP2dxhIAAAAASUVORK5CYII="
    }
    , d98d: function (t, e, i) {
        t.exports = "img/data-transfer.4ad7b63a.svg"
    }
    , e31f: function (t, e, i) {
        t.exports = "img/graph__short.7f03a105.svg"
    }
    , edd4: function (t) {
        t.exports = {
            header: {
                description: "Automatic Cross-chain Settlement System"
                , nav: {
                    list: [{
                        title: "Product"
                        , hash: "#product"
                    }, {
                        title: "Scope"
                        , hash: "#scope"
                    }, {
                        title: "Platform"
                        , hash: "#architecture"
                    }, {
                        title: "Team"
                        , hash: "#team"
                    }, {
                        title: "Documents"
                        , hash: "#documents"
                    }]
                }
            }
            , hero: {
                title: "This is the financial ecosystem of the future."
                , description: "Decentralized virtual cryptobanking ecosystem for instant payments through contactless payments and blockchain technology."
            }
            , product: {
                title: "The revolution in the world of banking."
                , list: [{
                    title: "ACSS decentralized cryptobank is designed for multi-currency transactions featuring a built-in fiat and cryptocurrency exchange system and instant contactless payments for goods and services worldwide."
                }, {
                    title: "The ACSS project works without intermediaries with its own cryptocurrency exchange and interbank ecosystem powered by the Light in-house blockchain technology combining finance and customer service processes."
                }, {
                    title: "It provides a simple and understandable crypto tool with minimum fees and secure transactions through smart contracts.With our in-house ecosystem, we can establish and manage various financial and social institutions through our decentralized registry."
                }]
            }
            , scope: {
                title: "We lift the limits on the cryptoworld."
                , description: "Decentralized virtual cryptobanking ecosystem for instant payments through contactless payments and blockchain technology."
                , message: "Sorry, there's a problem playing this video. Please try using adifferent browser."
            }
            , platform: {
                title: "The financial model of the banking system and cryptocurrency exchanges nowadays."
                , description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque minima rem quibusdam blanditiis similique velit inventore, hic autem earum voluptatem mollitia aspernatur magni fuga amet sint tempora ullam minus ut."
                , group: [{
                    title: "Cryptobank"
                    , description: "Commission 0.5 % from payment"
                }, {
                    title: "Banks"
                    , description: "Acquiring Bank, Issuing Bank (2-4% fee of the payment amount) payment"
                }, {
                    title: "Cryptocurrency exchanges"
                    , description: "Bitfinex, Binance, Kraken, Bittrex Poloniex - (commission 2-4% from payment)"
                }, {
                    title: "Decentralized cryptobank"
                    , description: "With a smart contract, customers work directly with a CryptoBank and save more than 8.7% on commissions and transactions"
                }, {
                    title: "Payment systems"
                    , description: "Visa, MasterCard, PayPal, Alipay - (commission 2-4% from payment)"
                }, {
                    title: "Smart contract"
                    , description: "Commission for transaction of CryptoBank 0.5 % Cryptocurrency exchanges 0,1 %"
                }]
            }
            , figures: {
                title: "Centralized and decentralized platforms in figures."
                , description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque minima rem quibusdam blanditiis similique velit inventore, hic autem earum voluptatem mollitia aspernatur magni fuga amet sint tempora ullam minus ut."
                , first: {
                    list: [{
                        description: "0.2% Cryptoexchange fee"
                    }, {
                        description: "91.65% Productivity"
                    }, {
                        description: "2.4% Bank fee"
                    }, {
                        description: "0.5% Crypotbank fee"
                    }, {
                        description: "2.4% Payment system commission"
                    }]
                }
                , second: {
                    list: [{
                        description: "0.1% Cryptoexchange fee"
                    }, {
                        description: "99.4% Productivity"
                    }, {
                        description: "0.5% Crypotbank fee"
                    }]
                }
                , conclusion: {
                    title: "Conclusion"
                    , description: "Because there are no intermediaries, the ACSS platform is cost-effective by 7.75%. This releases more than $36 billion a year in the cryptocurrency market."
                }
            }
            , banking: {
                centralized: {
                    title: "Banking Centralized system."
                    , list: [{
                        title: "Centralized platform"
                        , description: "Involves a string of brokers that do not provide transparency and charge high commissions for both merchants and affiliates"
                    }, {
                        title: "High commissions"
                        , description: "Up to 10% of average budget spent on these financial systems, that are based only on interest of holders"
                    }, {
                        title: "High costs"
                        , description: "Financial solutions and payment systems cost enough for business accounts - in management, services and accounting"
                    }, {
                        title: "No scalability and anonymity"
                        , description: "Systems are outdated and are tough to apply new technology solutions. Legal entities do not provide anonymity of transactions"
                    }]
                }
                , decentralized: {
                    title: "ACSS Decentralized system."
                    , list: [{
                        title: "Decentralized platform"
                        , description: "Creates an ecosystem that is transparent and automated on special engineering technology that connects brokers and uses smart contracts for fair deals"
                    }, {
                        title: "Lower commissions"
                        , description: "ACSS system charges average of 0.5% of deals and make them even lower according to asset management in fair trading"
                    }, {
                        title: "Free to use"
                        , description: "ACSS ecosystem is filled with ready and free financial services for customers and is free to communicate with partners"
                    }, {
                        title: "Scalable and anonymous"
                        , description: "Variety of tariffs and accounts provide anonymous use of crypto-fiat payment operations with global scale connection"
                    }]
                }
            }
            , architecture: {
                title: "Platform architecture"
                , ecosystem: {
                    title: "Ecosystem"
                    , description: "DApps and other types of external services will connect to ACSS using unique APIs. Blockchain uses “Json-RPC API” protocol to allow interaction with any types of coins and smart-contracts inside network. We use web-3 and load balancer to sort them. Stable Tokens exchange back up live data from cryptocurrency exchange backed live feed."
                }
                , banking: {
                    title: "Banking system"
                    , description: "Banking ecosystem of ACSS is based on a native and flexible interaction or communication between main business processes (service, management and compliance), enterprise information systems (such as account data, DApps management and customer integrations) and own internal data processing layer (within Blockchain, documentation, tx history and others)."
                }
                , exchange: {
                    title: "Exchange"
                    , description: "Hybrid exchanges should be the golden middle that will combine the advantages of a centralized exchange, such as cooperation with large investors and the trust of many users with the benefits of a decentralized exchange, such as secure storage and the absence of subordination to a higher authority."
                }
                , blockchain: {
                    title: "Blockchain"
                    , description: "ACSS has two different types of blockchain: open and secure. 1. Thepurpose of own open blockchain network is to develop an alternativeprotocol for building decentralized applications, presenting acomplex set of tradeoffs that we believe will be very useful for awide class of decentralized applications, with special emphasis onsituations where fast development time, safety for small and rarelyused applications, and the ability of various applications to veryefficiently interact, are important. ACSS network does this bycreating what is essentially the ultimate abstract foundationallayer: a block chain with a built-in Turing-complete programslanguage, letting anyone write smart contracts and decentralizedapplications where they can form their own arbitrary rules forownership, transaction formats, and state transition functions. 2.The secure blockchain includes all advantages of the open blockchain, with the goal of providing secure in-chain services for thebusiness. On the base of secure blockchain, we will launch Stabletokens smart contracts, KYC data storage, and a wide specter ofbusiness Dapps. Cryptocurrency exchange back connection by lifefeedwill serve Stable Tokens smart contracts by actual trading data."
                }
                , api: {
                    title: "API"
                    , description: "API management is a technology connection of basic services of ACSSand native and scalable platform for connection of other services ofpartners. Blockchain-based data clearing solutions operate onlightweight remote procedure JSON-RPC API protocol through web3 andload balancers. Future developing solution of atomic swaps is goingto provide ability to interact with any coin-family and smartcontracts."
                }
            }
            , convenient: {
                title: "Platform ACSS is advantageous and convenient"
                , stakeholder: {
                    title: "For every stakeholder"
                    , list: [{
                        description: "The highest reliability and security, instant transfer of fundsfrom point A to point B without limits with 0.5% transfer fee."
                    }, {
                        description: "Due to own cryptoexchange, you can exchange and withdrawcryptocurrency for a fee of 0-0.10%."
                    }, {
                        description: "Lowest fees, no hidden fees."
                    }, {
                        description: "Loans for private individuals and legal entities."
                    }, {
                        description: "The best rates for instant purchase, exchange,cryptocurrency-to-fiat and vice versa conversions."
                    }, {
                        description: "The investment fund will help implement any projects, miningfarms, and more."
                    }, {
                        description: "Own inter-bank financial channels system (SWIFT analog)."
                    }, {
                        description: "Escrow is essentially a holding tank which will help you keeptrack and hold money to be transferred to another person duringacquisition, exchange, or freelance services, etc."
                    }, {
                        description: "Own crypto ATMs and integration with the existing ones."
                    }, {
                        description: "An online robo-adviser that will advise the client when to buyor sell a cryptocurrency at a better rate."
                    }]
                }
                , individuals: {
                    title: "For private individuals"
                    , list: [{
                        description: "Instant smart contract-based payments for any services usingcryptocurrency without withdrawal of money from your wallet."
                    }, {
                        description: "Contactless payment methods for mobile devices powered by NFCtechnology."
                    }, {
                        description: "Well-developed loyalty system, bonuses and cashback foroperations, good deposit rates."
                    }, {
                        description: "Autonomy, the app will be available worldwide even if you ranout of mobile internet on your device."
                    }, {
                        description: "NFC to NFC cryptocurrency exchange."
                    }]
                }
                , entities: {
                    title: "For legal entities"
                    , list: [{
                        description: "Non-cash purchases of cryptocurrency at a good rate."
                    }, {
                        description: "Legal investment of corporate funds in crypto projects, purchaseof tokens, participation in an ICO."
                    }, {
                        description: "Salary projects."
                    }, {
                        description: "Cash withdrawals from anywhere in the world."
                    }]
                }
            }
            , mvp: {
                title: "MVP application"
                , features: {
                    title: "Features"
                    , list: [{
                        description: "Decentralized wallet."
                    }, {
                        description: "Get a free virtual multicurrency card right after registration."
                    }, {
                        description: "Instant payments and cryptocurrency-to-fiat transactions."
                    }, {
                        description: "Loyalty and cashback programs for each transaction, increasedcashback rates for tokens."
                    }, {
                        description: "Ability to anonymously use the ACSS ecosystem."
                    }, {
                        description: "Integration with external wallets or services, such as PayPal,Gyft, WeChat, Alipay, PayTM, Visa, MasterCard). MasterCard Worldbonuses."
                    }, {
                        description: "Contactless payment options such as QR, ApplePay, SamsungPay,AndroidPay, and many others."
                    }]
                }
                , wallet: {
                    title: "Linked to a wallet"
                    , list: [{
                        description: "Multi-currency cryptowallet."
                    }, {
                        description: "Decentralization & funds are stored on the users device."
                    }, {
                        description: "Anonymous and non-anonymous trade."
                    }, {
                        description: "Linking cryptowallets."
                    }, {
                        description: "Linking existing bankcards."
                    }, {
                        description: "Time and expenditure reports."
                    }, {
                        description: "System offers for keeping/trading cryptocurrencies."
                    }]
                }
                , payments: {
                    title: "NFC and QR payments"
                    , list: [{
                        description: "Pay worldwide with minimum fees."
                    }, {
                        description: "There is no need to wait in queue for transaction orders."
                    }, {
                        description: "Our built-in exchange features instant automated exchange possibilities."
                    }, {
                        description: "Flexible accounts systems."
                    }, {
                        description: "No geographical and legal limitations."
                    }, {
                        description: "NFC contactless payments."
                    }, {
                        description: "Convenient and phishing-protected payments via QR."
                    }]
                }
                , deposits: {
                    title: "Deposits"
                    , list: [{
                        description: "Convenient financial deposits interface."
                    }, {
                        description: "Individual anonymous and transparent decentralized accounts."
                    }, {
                        description: "Interactive set of customized reports."
                    }, {
                        description: "Flexible loyalty, bonus, and cashback system."
                    }, {
                        description: "Multi-currency integration with cryptocurrencies and fiat."
                    }, {
                        description: "Trading alerts system."
                    }, {
                        description: "Stablecoin internal system to avoid volatility."
                    }, {
                        description: "Accounts are linked with a virtual card."
                    }]
                }
                , management: {
                    title: "Management and reports"
                    , list: [{
                        description: "Online financial reporting."
                    }, {
                        description: "Cryptocurrency deposits report."
                    }, {
                        description: "Analysis of portfolio profitability."
                    }, {
                        description: "Analysis of expenditure and cashback."
                    }, {
                        description: "Customized financial management."
                    }, {
                        description: "Convenient settings system."
                    }, {
                        description: "Reporting for business."
                    }, {
                        description: "Convenient native visualization of reporting."
                    }]
                }
                , button: "Get the app now"
            }
            , team: {
                title: "Team"
            }
            , documents: {
                title: "Documents"
                , button: "Open document"
            }
            , partners: {
                title: "Partners"
            }
        }
    }
    , ef10: function (t, e, i) {
        t.exports = "img/shema-3.fd28b6cc.png"
    }
    , f427: function (t, e, i) {
        t.exports = "img/avatar-dmitry.e1284d61.png"
    }
    , f4bd: function (t, e, i) {
        t.exports = "img/avatar-pavel.5f00a299.png"
    }
    , f632: function (t, e) {
        t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAAAxCAMAAABu3oLEAAAAmVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VHQRUAAAAMnRSTlMA8bGvo2D1vgX7E92Y4lwcz6nr58a2n3UqDZKCeG84CQJ+QDEXukY91KyJZVUiyk7kSfyjJWwAAALmSURBVFjD7ZnpkqIwFIWvNsomq8gii4La7jqe93+4gUCgurta7F+mZzxlEW4B8ctNTiSGjIHgMgjCiwZ4TMbwKbIxeBhxQk/R9QeIEj1FpviIoxfiC/GF+D8gxrLoiCploiP6tByLi7iPAdyIJoBrzoREnFOh40wUw7fIERJxQrTYF0SHOZEyFRJxRqU09iFLzLGIFbWK7yNqQaB10TY55Ke24iBJkjYK0rp8b+4PzO6p4MhPU3ZVCWKlD3EctY/3OHoC5G3go5K3ZkFTqd1UBdTlEMOqSHhMbOI4N+cS9PLowF72Onp3JaZcP27uIDKOKT8/QU3NkY5dHRowTVPGvo7UcdumgshSGQvTjRm0kYcDmTAecPTpclCIzpITknQP8R2S0w6LGUZVcTxy+vIQQf2IOEfVBAcdooN8POCBNkY6RfaIo6NpTorX62gZVganCTbQaLldrRd1OMVCUUzoX7KIbYQOMcKYZii6RgNJv128qjkFRUWfoy3oRC5qJkWHxb7BJSYbwBRIPyL6CFT9Agd/uENKogzDrtUwfuho/x5ijkkYzlD37NKDRqGso+m1HVwXONFnRIqBYdQOYQPXcDWGxrNYslz7EdVx2M057h1EA0w73v6s6jiO6ILIw/sXRG0BrBWexQy10tbec6hW/1hMdZOYDn8K/3vEFab7tzfHRd2iBHa4XjtwOsQzEH1GzCg70YojzuG9lYLBLTehFHY/IhUXf10m3Z4rdGfSueBYow15Giu5TQ6AZWXXjdJEnGHbzLfNaIZSe+vGUsL6fwdp2e9omuW02CREi8H3iDOZVW/JvMb4Yts+76W9TFTWIUe13WfEFMgs5Wd5wsLQi1lpyqO6xsoGa9lePOBoskg7V7erYv5Gh9RKEvQ1Qtf4VVPQt27AuBFTLurCoNJcI8o8YdcuTCMiW9zlFVOqKJ7giK5hCLxI/TV/mLwQX4j39UIUEtH8t3avnrcH+Bt2UqU3wSX9BbYTtgFKd6L5AAAAAElFTkSuQmCC"
    }
});
