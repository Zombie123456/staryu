import axios from 'axios'
const event_type = 'wheel'

// NOTE: ideally, diff. kinds of API
// would be grouped into diff. files
// ie. /services/api/auth.js (for auth-related apis)

// function test() {
//   const p = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       const data = {
//         data: [
//           { created_at: '2019-04-15', account: 'srz****', prize: '1元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '2元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '3元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '4元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '5元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '6元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '7元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '8元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '9元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '10元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '11元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '12元筹码' },
//           { created_at: '2019-04-15', account: 'srz****', prize: '13元筹码' }
//         ]
//       }
//       resolve(data)
//     }, 1000)
//   })

//   return p
// }

export const getAnnouncements = () =>
  axios.get(`/member/announcement`).then(res => res.data)

export const getWinners = () => {
  const ax = axios.create({
    baseURL: '/'
  })

  return ax.get('salaryList.json').then(res => res.data)
}

export const getClaims = (username, options) =>
  axios
    .get('/member/envelopeclaim/', {
      params: {
        username,
        event_type,
        opt_expand: 'reward',
        offset: (options && options.offset) || '',
        limit: (options && options.limit) || ''
      }
    })
    .then(res => res.data)

export const getLevels = () =>
  axios
    .get('/member/envelopelevel/', {
      params: {
        event_type
      }
    })
    .then(res => res.data)

export const getEvents = () =>
  axios
    .get('/member/eventtypes/', {
      params: {
        code: event_type
      }
    })
    .then(res => res.data)

export const claimReward = username =>
  axios({
    url: '/member/envelopeclaim/',
    method: 'post',
    params: {
      event_type,
      opt_expand: 'reward'
    },
    data: { username, event_type }
  }).then(res => res)

export const getDeposits = username =>
  axios
    .get('/member/deposits/', {
      params: {
        username,
        event_type
      }
    })
    .then(res => res.data)

export const getClaimLeft = username =>
  axios
    .get('/member/envelopeclaim/', {
      params: {
        username,
        event_type,
        claim_left: 1
      }
    })
    .then(res => res)

export const getDomain = () =>
  axios.get('/member/global-preferences/domain').then(res => res.data)

export const getCustomerServiceLink = () =>
  axios.get('/member/global-preferences/customer_service').then(res => res.data)
