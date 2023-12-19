import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@pages/Auth/LoginView.vue'
import RegisterView from '@pages/Auth/RegisterView.vue'

import MemberView from '@pages/Member/MainView.vue'
import LandingPage from '@pages/LandingPage/HomeScreen.vue'

///topic
import DashboardTopic from '@pages/Member/MainView/Topic/DashboardView.vue'
import NewsTopic from '@pages/Member/MainView/Topic/NewsView.vue'
import AnalysisTopic from '@pages/Member/MainView/Topic/AnalysisView.vue'
import SettingTopic from '@pages/Member/MainView/Topic/SettingView.vue'
import LinimasaTopic from '@pages/Member/MainView/Topic/LinimasaView.vue'


///BII
import CompetitorAnalystBiiScreen from '@pages/Member/MainView/Bussiness/CompetitorAnalyst.vue'
import PricingBiiScreen from '@pages/Member/MainView/Bussiness/PricingPage.vue'
import DifferentiationBiiScreen from '@pages/Member/MainView/Bussiness/DifferentiationPage.vue'
import AdsBiiScreen from '@pages/Member/MainView/Bussiness/AdsPage.vue'
import AnalisaProblemBiiScreen from '@pages/Member/MainView/Bussiness/AnalisaProblemPage.vue'
import AnalisaMarketBiiScreen from '@pages/Member/MainView/Bussiness/AnalisaMarketPage.vue'
import CompetitorBusinessBiiScreen from '@pages/Member/MainView/Bussiness/CompetitorBusinessPage.vue'

///Analysis
import TopicAnalystScreen from '@pages/Member/MainView/Analytic/TopicView.vue'
import IssueAnalystScreen from '@pages/Member/MainView/Analytic/IssueView.vue'
import HashtagAnalystScreen from '@pages/Member/MainView/Analytic/HashtagView.vue'

///Comparison
import DashboardComparisonScreen from '@pages/Member/MainView/Comparison/DashboardView.vue'
import ShareScreen from '@pages/Member/MainView/Comparison/ShareView.vue'
import TrendScreen from '@pages/Member/MainView/Comparison/TrendsView.vue'

///Serach
import SearchScreen from '@pages/Member/MainView/Search.vue'

///website
import WebScreen from '@pages/Member/MainView/Website/WebanalystView.vue'
import BussinessScreen from '@pages/Member/MainView/Website/BussinessView.vue'
import TechScreen from '@pages/Member/MainView/Website/TechView.vue'
import SeoScreen from '@pages/Member/MainView/Website/SeoView.vue'


////admin panel
import AdminView from '@pages/Admin/MainView.vue'
import DashboardScreen from '@pages/Admin/MainView/DashboardView.vue'
//admin subscriber
import AktifScreen from '@pages/Admin/MainView/Subscriber/AktifView.vue'
import ExpiredScreen from '@pages/Admin/MainView/Subscriber/ExpiredView.vue'
import RequestScreen from '@pages/Admin/MainView/Subscriber/RequestView.vue'
//admin user
import UserScreen from '@pages/Admin/MainView/User/UserView.vue'
import ProhibitedScreen from '@pages/Admin/MainView/User/ProhibitedView.vue'
import AdminScreen from '@pages/Admin/MainView/User/AdminView.vue'
//admin website
import BannerScreen from '@pages/Admin/MainView/Website/BannerView.vue'
import AboutScreen from '@pages/Admin/MainView/Website/AboutView.vue'
import ProductScreen from '@pages/Admin/MainView/Website/ProductView.vue'
import LayananScreen from '@pages/Admin/MainView/Website/LayananView.vue'
import TestimoniScreen from '@pages/Admin/MainView/Website/TestimoniView.vue'
import PartnerScreen from '@pages/Admin/MainView/Website/PartnerView.vue'
//Profile
import ProfileScreen from '@pages/ProfileView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/Admin',
    component: AdminView,
    children: [
      {
        path: 'MainView/Dashboard',
        name: 'admindashboard',
        component: DashboardScreen
      },
      {
        path: 'MainView/Subscriber/Aktif',
        name: 'adminAktif',
        component: AktifScreen
      }, {
        path: 'MainView/Subscriber/NonAktif',
        name: 'adminNonAktif',
        component: ExpiredScreen
      }, {
        path: 'MainView/Subscriber/Request',
        name: 'adminRequest',
        component: RequestScreen
      },
      {
        path: 'MainView/User/Pengguna',
        name: 'PenggunaAktif',
        component: UserScreen
      }, {
        path: 'MainView/User/Prohibited',
        name: 'Prohibited',
        component: ProhibitedScreen
      }, {
        path: 'MainView/User/Admin',
        name: 'AdminRequest',
        component: AdminScreen
      },
      {
        path: 'MainView/Website/Banner',
        name: 'Banner',
        component: BannerScreen
      }, {
        path: 'MainView/Website/AboutUs',
        name: 'AboutUs',
        component: AboutScreen
      }, {
        path: 'MainView/Website/Produk',
        name: 'Produk',
        component: ProductScreen
      },
      {
        path: 'MainView/Website/Layanan',
        name: 'Layanan',
        component: LayananScreen
      }, {
        path: 'MainView/Website/Testimoni',
        name: 'Testimoni',
        component: TestimoniScreen
      }, {
        path: 'MainView/Website/Partner',
        name: 'Partner',
        component: PartnerScreen
      },
    ]
  },
  {
    path: '/Member',
    component: MemberView,
    children: [
      {
        path: 'MainView/Search',
        name: 'search',
        component: SearchScreen
      },
      {
        path: 'MainView/Topic/DashboardView',
        name: 'dashboard',
        component: DashboardTopic
      },
      {
        path: 'MainView/Topic/LinimasaView',
        name: 'linimasa',
        component: LinimasaTopic
      },
      {
        path: 'MainView/Topic/NewsView',
        name: 'news',
        component: NewsTopic
      },
      {
        path: 'MainView/Topic/AnalysisView',
        name: 'analysis',
        component: AnalysisTopic
      },
      {
        path: 'MainView/Topic/SettingView',
        name: 'pengaturan',
        component: SettingTopic
      },
      {
        path: 'MainView/Bussiness/CompetitorAnalyst',
        name: 'Competitor-analyst',
        component: CompetitorAnalystBiiScreen
      },
      {
        path: 'MainView/Bussiness/PricingPage',
        name: 'pricing-strategy',
        component: PricingBiiScreen
      },
      {
        path: 'MainView/Bussiness/DifferentiationPage',
        name: 'differentiation-product',
        component: DifferentiationBiiScreen
      },
      {
        path: 'MainView/Bussiness/AdsPage',
        name: 'Ads-Campaign',
        component: AdsBiiScreen
      },
      {
        path: 'MainView/Bussiness/AnalisaProblemPage',
        name: 'analisa-problem-market',
        component: AnalisaProblemBiiScreen
      },
      {
        path: 'MainView/Bussiness/AnalisaMarketPage',
        name: 'analisa-market-share',
        component: AnalisaMarketBiiScreen
      },
      {
        path: 'MainView/Bussiness/CompetitorBusinessPage',
        name: 'Competitor-business',
        component: CompetitorBusinessBiiScreen
      },
      {
        path: 'MainView/Analytic/TopicView',
        name: 'Topic',
        component: TopicAnalystScreen
      },
      {
        path: 'MainView/Analytic/IssueView',
        name: 'Issue',
        component: IssueAnalystScreen
      },
      {
        path: 'MainView/Analytic/HashtagView',
        name: 'Hashtag',
        component: HashtagAnalystScreen
      },
      {
        path: 'MainView/Comparison/DashboardView',
        name: 'dashboards',
        component: DashboardComparisonScreen
      },
      {
        path: 'MainView/Comparison/ShareView',
        name: 'shareofvoice',
        component: ShareScreen
      },
      {
        path: 'MainView/Comparison/TrendsView',
        name: 'trend',
        component: TrendScreen
      },
      {
        path: 'MainView/Website/WebanalystView',
        name: 'WebScreen',
        component: WebScreen
      },
      {
        path: 'MainView/Website/BussinessView',
        name: 'BussinessScreen',
        component: BussinessScreen
      },
      {
        path: 'MainView/Website/TechView',
        name: 'TechScreen',
        component: TechScreen
      },
      {
        path: 'MainView/Website/SeoView',
        name: 'SeoScreen',
        component: SeoScreen
      },
      {
        path: 'MainView/Pengaturan/Profile',
        name: 'Profile',
        component: ProfileScreen
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
  ]
})

export default router
