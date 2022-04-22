import { Tabs as AntTabs } from 'antd'
import styled from 'styled-components'

const Tabs = styled(AntTabs)`
  ${'' /* .ant-tabs-nav {
    margin: 0px !important;
  } */}

  .ant-tabs-nav-list {
    .ant-tabs-tab {
      .ant-tabs-tab-btn {
        color: #000000 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
      }
    }

    .ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #000000 !important;
        font-size: 16px !important;
        font-weight: 600 !important;
      }
    }
  }

  .ant-tabs-ink-bar {
    background: #000000 !important;
  }
`

Tabs.TabPane = AntTabs.TabPane

export default Tabs
