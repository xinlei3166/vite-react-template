import { useState, useRef } from 'react'
import { message, Form, Button, Input, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setToken } from '@packages/utils'
import {
  useAppSelector,
  useAppDispatch,
  fetchUserinfo,
  fetchPermissions,
  fetchMenus
} from '@/store'
import { login } from '@/api'

function Login() {
  // ====================== Hooks ======================
  const theme = useAppSelector(state => state.theme)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  // ====================== Components ======================
  const title = import.meta.env.VITE_APP_TITLE
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    console.log(values)
    return
    setLoading(true)
    const res = await login({
      account: values.userAccount,
      password: values.password
    })
    setLoading(false)
    if (!res || res.code !== 0) return
    setToken(res.data.accessToken)
    const query: Record<string, any> = { ...searchParams }
    const { redirect } = query
    if (redirect) {
      Reflect.deleteProperty(query, 'redirect')
    }
    // let path = redirect ? decodeURIComponent(redirect) : '/'
    const path = '/'
    if (__DYNAMIC_MENU__) {
      await dispatch(fetchMenus())
    }
    await dispatch(fetchUserinfo())
    await dispatch(fetchPermissions())
    message.success({
      content: '登录成功',
      duration: 1,
      onClose: () => {
        navigate(path)
      }
    })

    return (
      <div className="user-layout box-border border-border">
        <div className="login-wrap">
          <div className="login">
            <div className="login-title">
              <img className="login-title-img" src="@/assets/logo.png" />
              <span className="login-title-text">{title}</span>
            </div>
            <div className="text-text2 text-center mt-4 mb-12">
              React 是一款非常流行的 JavaScript 前端框架
            </div>
            <Form
              className="login-form"
              colon={false}
              labelCol={{ flex: '50px' }}
              labelAlign="right"
              onFinish={onFinish}
            >
              <Form.Item
                className="login-form-item"
                name="account"
                rules={[
                  {
                    required: true,
                    message: '请输入账号',
                    validateTrigger: 'onBlur'
                  }
                ]}
              >
                <Input
                  size="large"
                  allowClear
                  placeholder="账号：admin"
                  prefix={
                    <UserOutlined
                      className="text-primary text-3.5"
                      type="user"
                    />
                  }
                ></Input>
              </Form.Item>
              <Form.Item
                className="login-form-item"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                    validateTrigger: 'onBlur'
                  }
                ]}
              >
                <Input.Password
                  size="large"
                  type="password"
                  allowClear
                  placeholder="密码：123456"
                  prefix={
                    <LockOutlined
                      className="text-primary text-3.5"
                      type="user"
                    />
                  }
                ></Input.Password>
              </Form.Item>
              <Form.Item name="remember">
                <Checkbox>自动登录</Checkbox>
                <a className="float-right text-btn" href="#">
                  忘记密码
                </a>
              </Form.Item>
              <Form.Item className="login-form-btn-wrap">
                <Button
                  className="login-btn"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  登 录
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="footer">
            <div className="links">
              <a className="link" href="_self">
                帮助
              </a>
              <a className="link" href="_self">
                隐私
              </a>
              <a className="link" href="_self">
                条款
              </a>
            </div>
            <div className="copyright">Copyright © 2023 君惜 (xinlei3166)</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
