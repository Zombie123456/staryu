<template>
  <v-app>
    <section>
      <div class="header" style="min-width: 1100px;">
        <NoticeDialog v-if="events.length > 0" :event="events[0]" />
        <div class="a_auto">
          <div class="head">
            <div class="head_1">
              <img src="/images/logo.png" alt="" />
            </div>
            <div class="head_1" style="margin-left: 40px;">
              <img src="/images/slogan.png" alt="" />
            </div>
            <div class="head_2">
              <a :href="domain" title="" target="_blank">官方首页</a>
              <a :href="`${domain}Register`" title="" target="_blank"
                >会员注册</a
              >
              <a :href="`${domain}Promotion`" title="" target="_blank"
                >优惠申请</a
              >
              <a :href="getAppDownload.value" title="" target="_blank"
                >APP下载
              </a>
              <a :href="customerServiceLink" title="" target="_blank"
                >在线客服
              </a>
              <a href="#rule" title="">抽奖规则</a>
            </div>
          </div>
        </div>
      </div>

      <div class="bar">
        <div class="notice_scroll">
          <div class="notice_scroll_wrap a_auto">
            <div class="noticeleft">
              <img src="/images/notice-ico.png" height="20" width="20" alt="" />
              最新公告
            </div>

            <div class="noticeright">
              <marquee
                scrollamount="3"
                scrolldelay="100"
                direction="left"
                onmouseover="this.stop();"
                onmouseout="this.start();"
              >
                <span v-for="item in announcements" :key="item.id">
                  {{ item.announcement }}
                </span>
              </marquee>
            </div>
          </div>
        </div>

        <div class="a_auto">
          <div class="bar_m">
            <div class="bar_1">
              <div class="lay_1">
                <img src="/images/img-zp.png" alt="" />
              </div>
              <div class="lay_2">
                <img src="/images/turntable.png" class="wheel" />
              </div>
              <div class="lay_3">
                <img src="/images/img8.png" alt="" />
              </div>
              <div class="lay_4">
                <a class="ta_2 cj_btn" @click.prevent="claim()">
                  <img
                    id="cj_img"
                    src="/images/img9.png"
                    alt=""
                    :class="canClaim ? `` : `gray`"
                  />
                </a>
              </div>
            </div>

            <div class="bar_2">
              <div style="height: 353px;">
                <div style="width: 96%;margin-left: 2%;">
                  <div class="row" style="margin-top: 10px;">
                    <div
                      class="col-md-3 left-label text-right"
                      style="padding-right: 0;"
                    >
                      会员账号：
                    </div>
                    <div class="col-md-5" style="padding: 0;">
                      <input
                        v-model="username"
                        type="text"
                        class="form-control account"
                        style="border-radius: 5px;width: 250px;"
                        placeholder="输入游戏账号查询哦"
                      />
                    </div>
                    <div class="col-md-2" style="padding-left: 0;">
                      <button
                        class="btn btn-success search_account"
                        type="button"
                        style="width: 62px"
                        @click.prevent="searchAccount()"
                      >
                        查 询
                      </button>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 15px;">
                    <div
                      class="col-md-3 left-label text-right"
                      style="padding-right: 0;"
                    >
                      总存款：
                    </div>
                    <div class="col-md-7" style="padding-left: 0;">
                      <input
                        v-model="deposit"
                        type="text"
                        class="form-control account save_amount"
                        style="border-radius: 5px;width: 250px;"
                        readonly=""
                      />
                    </div>
                  </div>

                  <div class="row" style="margin-top: 8px; display: none">
                    <div
                      class="col-md-3 left-label text-right"
                      style="padding-right: 0;"
                    >
                      当日有效投注：
                    </div>
                    <div class="col-md-7" style="padding-left: 0;width: 18px">
                      <input
                        type="text"
                        class="form-control account bet-amount"
                        style="border-radius: 5px;width: 250px;"
                        readonly=""
                      />
                    </div>
                  </div>
                  <div
                    class=""
                    role="alert"
                    style="padding-top:27px;margin-left:10px;font-size:14px;color: #bcad8d;margin-bottom:0;"
                  >
                    历史中奖记录
                    <div style="width: 550px;margin-top: 5px;height: 133px;">
                      <table v-if="claims.length > 0" id="history">
                        <tbody>
                          <tr style="text-align: center;">
                            <th>日期</th>
                            <th>奖励</th>
                            <th>状态</th>
                          </tr>
                          <tr v-for="(c, idx) in claims" :key="idx" :num="idx">
                            <td align="center">
                              {{
                                c.created_at | moment('YYYY-MM-DD h:mm:ss A')
                              }}
                            </td>
                            <td align="center">{{ c.reward.name }}</td>
                            <td align="center">
                              <span
                                :style="{ color: getStatus(c.status, 'color') }"
                                >{{ getStatus(c.status, 'text') }}</span
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div
                        style="float: none;margin: 3px -2px;"
                        class="pages pagination"
                      ></div>
                    </div>
                  </div>
                  <div
                    style="margin-top:10px;font-size: 16px;font-weight: bold;"
                  >
                    您当前有
                    <span
                      class="cj_count"
                      style="color: white;font-size: 1.3rem;"
                    >
                      {{ claimLeft }}
                    </span>
                    次抽奖机会!
                  </div>
                </div>
              </div>
            </div>

            <div class="bar_4">
              <div class="s_bot">
                <div
                  v-if="!showList"
                  style="text-align: center;top: 60px;position: relative; color: red; font-weight: bold;"
                >
                  敬请期待
                </div>
                <div v-if="showList" class="list_lh">
                  <ul class="drawList" style="margin-top: -9px;">
                    <li v-for="(w, idx) in winnerData1" :key="idx">
                      <span>{{ w.name }}</span>
                      <em>{{ w.money }}</em>
                    </li>
                  </ul>
                </div>
                <div v-if="showList" class="list_lh">
                  <ul class="drawList2" style="margin-top: -9px;">
                    <li v-for="(w, idx) in winnerData2" :key="idx">
                      <span>{{ w.name }}</span>
                      <em>{{ w.money }}</em>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bar_3" style="margin-top: 20px;">
              <p style="font-size: 16px;color: #b9a888">
                活动期间在金沙娱乐城最低存款500以上的会员，将获得幸运转盘次数，并有机会获得北欧航线‘帝王公主号’豪华15日游，名额不限，赶快参与！
              </p>
              <div class="mr_frbox">
                <div class="mr_frUl">
                  <div
                    class="tempWrap"
                    style="overflow:hidden; position:relative; width:768px"
                  >
                    <ul
                      style="width: 9216px; position: relative; overflow: hidden; padding: 0px; margin: 0px; left: -3072px;"
                    >
                      <li
                        v-for="(ad, idx) in ads"
                        :key="idx"
                        style="float: left; width: 250px;"
                      >
                        <a href="javascript:void (0);">
                          <img class="ad" :src="`/images/${ad}`" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div style="width: 100%; float: left;">
              <p style="font-size: 16px;color: #b9a888">
                劳动最光荣，好运转出来 <br />
                为了回馈广大新老客户，澳门金沙娱乐场在5.1劳动节推出年幸运大转盘惊喜优惠，超级大奖价值38888元的海上欧洲豪华15日游，赶快加入<br /><a
                  :href="`${domain}Register`"
                  style="color:red;text-decoration: none"
                  target="_blank"
                  >立即注册GO！</a
                >更多惊喜优惠请关注澳门金沙娱乐场19222.com
              </p>
            </div>

            <style>
              .cjtj-table {
                width: 100%;
                margin-top: 55px;
                padding: 20px;
                color: #b9a888;
              }
              .cjtj-table tr {
                text-align: center;
                height: 45px;
              }
              .cjtj-table th {
                color: #fff;
                font-size: 18px;
              }
              .cjtj-table td {
                color: #b9a888;
                font-size: 15px;
              }
              .cjtj-table th,
              td {
                border: 1px solid #cbb696;
              }
            </style>
            <div class="bar_6">
              <table class="cjtj-table">
                <tbody>
                  <tr style="text-align: center;">
                    <th>存款时间</th>
                    <th>存款范围</th>
                    <th>转盘次数</th>
                    <th>提款要求</th>
                  </tr>
                  <tr v-for="(l, idx) in levels" :key="idx">
                    <td
                      v-if="idx == 0"
                      :rowspan="levels.length"
                      style="padding: 10px"
                    >
                      {{ idx == 0 ? `（美东时间）2019年5月1日至5月7日` : `` }}
                    </td>
                    <td>{{ l.name }}</td>
                    <td>{{ `${l.quantity} 次` }}</td>
                    <td
                      v-if="idx == 0"
                      :rowspan="levels.length"
                      style="padding: 10px"
                    >
                      {{ idx == 0 ? `1倍流水` : `` }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="rule" class="bar_5">
              <p>
                1.
                所有优惠以人民币（CNY）为结算金额，存款总额和有效投注额按照美东时间统计，即每天中午12点至次日中午12点为一个计算周期；
              </p>
              <p>
                2.
                产生的转盘次数将在次日北京时间14:00生效,生效后即可凭游戏账号参与澳门金沙幸运大转盘活动
              </p>
              <p>
                3. 本活动抽中东南亚七日豪华游,
                海上欧洲豪华15日游请第一时间联系在线客服申请，具体出游时间由澳门金沙决定，两人同行，其中包含港澳台通行证，国际往返机票，旅游景点门票，全程中文导游，领队全陪。包括豪华巴士，旅游用车，全程包吃住，以及导游小费，此活动有效兑换期限是1星期,逾期视为放弃；
              </p>
              <p>
                4. 本活动抽中IPhone XS
                256G（黑色，256G，国行）实物奖品的会员，奖品不可折现，请务必于中奖后三个工作日内联系我司客服提供快递收货地址、姓名及联系电话，奖品将在中奖会员提供具体收货地址后十个工作日内寄出，如中奖后三个工作日内未联系我司确认收货地址
                或因个人提供的收件信息不完整、不正确、电话无法联系上导致物品无法寄达快递退回的情况，均视为自动放弃不再安排寄送；
              </p>
              <p>
                5. 本活动抽中“现金筹码”的会员无需联系申请,
                系统将在30分钟内自动添加到中奖会员账号内, 1倍流水即可申请提款；
              </p>
              <p>
                6.
                本活动抽中“电子游艺存xxx送xxx优惠券”的会员务必在中奖后，在美东时间当天内存款xxx元后联系在线客服申请送xxx元的优惠（申请期间不可下注，否则视为弃权处理），此项存送优惠，需在电子游艺中完成（本金+红利）*5倍流水方可全额提款；
              </p>
              <p>
                7. 每一位会员，每一住址，每一电子邮箱地址，每一电话号码，
                相同支付方式(相同借记卡/信用卡/银行账户)及IP地址当日最多仅获得3次转盘机会，如发现会员同一个IP下登陆多个账号，公司有权拒绝赠送其彩金并做账号冻结处理，保证正常玩家的利益；
              </p>
              <p>
                8.
                澳门金沙娱乐的所有优惠特为会员而设，如发现任何团体或个人，以不诚实方式套取彩金或任何威胁，滥用优惠彩金等行为，澳门金沙娱乐将保留冻结、取消该团体或个人账户余额的权利；
              </p>
              <p>
                9.
                澳门金沙娱乐场保留对活动的最终解释权，以及在无通知的情况下修改、终止活动的权利。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="alert-result">
        <div class="envelope-container" align="center">
          <div class="envelope-text-wrapper">
            <div>
              恭喜你中奖了，奖品是 <span>{{ reward }}</span>
            </div>
          </div>
          <div class="btn-okay" @click.prevent="toggleClaim()"></div>
        </div>
      </div>
    </section>
  </v-app>
</template>
<style scope>
.noticeleft {
  width: 10%;
}

.noticeright {
  width: 90%;
  padding-top: 2px;
}

.notice_scroll {
  background: #313131;
  padding: 5px;
}

.notice_scroll_wrap {
  color: #f5d463;
  display: flex;
  padding: 0 10px;
}
</style>

<script>
import NoticeDialog from '@/components/NoticeDialog'
export default {
  components: {
    NoticeDialog
  },
  data() {
    return {
      events: [],
      username: '',
      limitTime: '',
      issmeTime: '',
      isSameDate: '',
      presentTime: '',
      getAppDownload: '',
      reward: '',
      claimLeft: 0,
      deposit: null,
      domain: null,
      customerServiceLink: '',
      startSpin: false,
      claims: [],
      announcements: [],
      levels: [],
      winnerData1: [],
      winnerData2: [],
      canClaimOnDate: '',
      showList: this.$moment().isSameOrAfter('2019-05-02 14:00:00'),
      ads: [
        'ad1.png',
        'ad2.png',
        'ad3.png',
        'ad4.png',
        'ad5.png',
        'ad6.png',
        'ad7.png',
        'ad8.png',
        'ad9.png',
        'ad10.png',
        'ad11.png',
        'ad12.png'
      ]
    }
  },
  computed: {
    canClaim() {
      const claimLeft = this.claimLeft
      if (claimLeft > 0) return true

      return false
    }
  },
  async mounted() {
    const sliceNum = 2
    const { data: announcements } = await this.$api.getAnnouncements()
    const { data: winners } = await this.$api.getWinners()
    const { data: levels } = await this.$api.getLevels()
    const { data: events } = await this.$api.getEvents()
    const { data: getAppDownload } = await this.$api.getAppDownload()
    const {
      data: { value: domain }
    } = await this.$api.getDomain()
    const {
      data: { value: customerServiceLink }
    } = await this.$api.getCustomerServiceLink()
    // moment('2010-10-20').isSame('2009-12-31', 'year');
    // 判断相同日期
    this.isSameDate = this.$moment(
      this.$moment(events[0].date_from, 'YYYY-MM-DD')
    ).isSame(this.$moment(events[0].date_to, 'YYYY-MM-DD'))
    // 判断是否在两个日期之间
    this.canClaimOnDate = this.$moment().isBetween(
      this.$moment(events[0].date_from, 'YYYY-MM-DD'),
      this.$moment(events[0].date_to, 'YYYY-MM-DD')
    )
    this.presentTime = this.$moment(
      this.$moment(events[0].date_from, 'YYYY-MM-DD')
    ).isSame(this.$moment(this.$moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'))
    // 判断是否在两个时间之间
    this.issmeTime = this.$moment().isBetween(
      this.$moment(events[0].time_from, 'H:mm:ss'),
      this.$moment(events[0].time_to, 'H:mm:ss')
    )
    this.limitTime = events[0]
    const winnerData1 = winners.slice(0, Math.round(winners.length / sliceNum))
    const winnerData2 = winners.slice(
      Math.round(winners.length / sliceNum),
      winners.length
    )

    Object.assign(this, {
      announcements,
      domain,
      customerServiceLink,
      levels,
      winnerData1,
      winnerData2,
      events,
      getAppDownload
    })

    $('.list_lh li:even').addClass('lieven')
    $('div.list_lh').myScroll({
      speed: 60, // 数值越大，速度越慢
      rowHeight: 25 // li的高度
    })

    $('.mr_frbox').slide({
      titCell: '',
      mainCell: '.mr_frUl ul',
      autoPage: true,
      effect: 'leftLoop',
      interTime: 1500,
      autoPlay: true,
      vis: 3
    })
  },
  methods: {
    async claim() {
      const _self = this
      const username = this.username
      console.log('==')
      console.log()
      console.log('==')

      if (
        (this.isSameDate && this.issmeTime && this.presentTime) ||
        (this.canClaimOnDate && this.issmeTime)
      ) {
        console.log('正在活动中')
      } else {
        return alert(
          `抽奖时间:${this.limitTime.date_from}～～${this.limitTime.date_from}
          每天:${this.limitTime.time_from}～～${this.limitTime.time_to}`
        )
      }
      if (this.canClaim && this.startSpin === false) {
        this.startSpin = true
        try {
          const { data: claim } = await this.$api.claimReward(username)
          const { data: claims } = await this.$api.getClaims(username)

          switch (claim.code) {
            case 2000:
              const { data: res } = claim
              const target = 30 - 30 * res.reward.id

              $('.wheel').css({
                transition: 'transform 5s cubic-bezier(0.45,-0.05, 0.3, 1.05)',
                transform: 'rotate(' + (target + 3600) + 'deg)'
              })

              setTimeout(function() {
                $('.wheel').css({
                  transition: 'initial',
                  transform: 'rotate(' + target + 'deg)'
                })
              }, 5200)

              setTimeout(function() {
                _self.reward = res.reward.name
                _self.claimLeft = res.claim_left
                _self.startSpin = false
                _self.claims = claims
                _self.paginateHistory()
                _self.toggleClaim()
              }, 6000)
              break

            case 3001:
              throw new Error('您的帐号领取次数已经用完')

            default:
              throw new Error('当前时段无法领取红包')
          }
        } catch (ex) {
          alert(ex.message)
        }
      }
    },
    async searchAccount() {
      const username = this.username

      if (/^[a-zA-z0-9_-]+$/.test(username) === false)
        return alert('请输入正确的用户名')

      const {
        data: { amount: deposit }
      } = await this.$api.getDeposits(username)
      let { data: claimLeft } = await this.$api.getClaimLeft(username)

      if (claimLeft.code === 2000) {
        claimLeft = claimLeft.data.claim_left
      } else {
        claimLeft = 0
      }

      const { data: claims } = await this.$api.getClaims(username)
      this.paginateHistory()

      Object.assign(this, {
        claims,
        deposit,
        claimLeft
      })
    },
    paginateHistory() {
      setTimeout(function() {
        $('.pagination').each(function() {
          const table = $(this).prev()
          table.find('tr[num]').hide()
          $(this).jBootstrapPage({
            pageSize: 3,
            total: table.find('tr[num]').size(),
            maxPageButton: 3,
            onPageClicked: function(obj, pageIndex, from, to, config) {
              table.find('tr[num]').hide()
              for (let i = from; i <= to; i++) {
                table.find('tr[num=' + i + ']').show()
              }
            }
          })
          $(this)
            .find('[pnum=1] a')
            .trigger('pageClick')
        })
      }, 10)
    },
    getStatus(status, mode) {
      const prop = {
        0: {
          color: 'inherit',
          text: '待处理'
        },
        1: {
          color: '#cac34a',
          text: '已派彩'
        },
        2: {
          color: 'red',
          text: '已拒绝'
        }
      }

      return prop[status][mode]
    },
    toggleClaim() {
      $('.alert-result').toggle()
    }
  }
}
</script>
