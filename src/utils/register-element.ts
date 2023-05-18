import {
  Button,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Checkbox,
  CheckboxGroup,
  Tag,
  Card,
  Row,
  Col,
  Typography,
  List,
  Upload,
  Textarea,
  Input,
  PageHeader,
  Select,
  message,
  Popconfirm,
  Drawer,
  Menu,
  SubMenu,
  MenuItem,
  Tooltip,
  Timeline,
  TimelineItem,
  Table,
  Divider,
  TabPane,
  Tabs,
  Form,
  FormItem,
  CheckableTag
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { Link } from 'ant-design-vue/lib/anchor'

const components = [
  Button,
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Checkbox,
  CheckboxGroup,
  List,
  Tag,
  Card,
  Row,
  Col,
  Typography,
  Upload,
  Textarea,
  Input,
  PageHeader,
  Select,
  message,
  Popconfirm,
  Drawer,
  Menu,
  SubMenu,
  MenuItem,
  Tooltip,
  Timeline,
  TimelineItem,
  Table,
  Divider,
  TabPane,
  Tabs,
  Form,
  FormItem,
  Link,
  CheckableTag
]

export default function registerElement(app: any) {
  for (const el of components) {
    app.use(el)
  }
}
