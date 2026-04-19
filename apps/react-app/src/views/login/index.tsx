import type { FormInstanceFunctions } from 'tdesign-react'
import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from 'tdesign-icons-react'
import { Form, Button, Input, Checkbox } from 'tdesign-react'
import { MessagePlugin } from 'tdesign-react'
import { setToken } from '@packages/utils'
import { login } from '@/api'
import logo from '@/assets/logo.svg'
import {
  useAppSelector,
  useAppDispatch,
  fetchUserinfo,
  fetchPermissions,
  fetchMenus
} from '@/store'
import './index.less'

function Login() {
  // ====================== Hooks ======================
  const theme = useAppSelector(state => state.theme)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  // ====================== Components ======================
  const title = import.meta.env.VITE_APP_TITLE
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormInstanceFunctions>(undefined)

  const onSubmit = async () => {
    const validateResult = await formRef.current?.validate()
    if (validateResult !== true) return
    setLoading(true)
    const values: any = formRef.current?.getFieldsValue(true)
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
    MessagePlugin.success({
      content: '登录成功',
      duration: 1000,
      onClose: () => {
        navigate(path)
      }
    })
  }

  return (
    <div className="user-layout box-border border-border">
      <div className="login-wrap">
        <div className="login">
          <div className="login-title">
            <img className="login-title-img" src={logo} />
            <span className="login-title-text">{title}</span>
          </div>
          <div className="text-textPrimary2 text-center mt-4 mb-12">
            React 是一款非常流行的 JavaScript 前端框架
          </div>
          <Form
            className="login-form"
            ref={formRef}
            colon={false}
            labelWidth="50px"
            labelAlign="right"
            initialData={{ remember: false }}
          >
            <Form.FormItem
              className="login-form-item"
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入账号',
                  trigger: 'blur'
                }
              ]}
            >
              <Input
                size="large"
                clearable
                placeholder="账号：admin"
                prefixIcon={<Icon name="user" />}
              ></Input>
            </Form.FormItem>
            <Form.FormItem
              className="login-form-item"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
                }
              ]}
            >
              <Input
                size="large"
                type="password"
                clearable
                placeholder="密码：123456"
                prefixIcon={<Icon name="lock-on" />}
              ></Input>
            </Form.FormItem>
            <Form.FormItem name="remember">
              <Checkbox>自动登录</Checkbox>
              <a className="text-btn ml-auto" href="#">
                忘记密码
              </a>
            </Form.FormItem>
            <Form.FormItem className="login-form-btn-wrap">
              <Button
                className="login-btn"
                size="large"
                theme="primary"
                loading={loading}
                onClick={onSubmit}
              >
                登 录
              </Button>
            </Form.FormItem>
          </Form>
        </div>
        <div className="footer">
          <div className="links">
            <a className="link" href="/login" target="_self">
              帮助
            </a>
            <a className="link" href="/login" target="_self">
              隐私
            </a>
            <a className="link" href="/login" target="_self">
              条款
            </a>
          </div>
          <div className="copyright">Copyright © 2023 君惜 (xinlei3166)</div>
        </div>
      </div>
    </div>
  )
}

export default Login
