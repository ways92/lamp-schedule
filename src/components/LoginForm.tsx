// import '@ant-design/v5-patch-for-react-19';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button, Form, Input, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title } = Typography;
const loginSchema = z.object( {
  email: z.string().email( "Email tidak valid" ).min( 1, "Email wajib diisi" ),
  password: z.string().min( 3, "Password minimal 3 karakter" ),
} );

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState( false );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>( {
    resolver: zodResolver( loginSchema ),
  } );


  const onSubmit = async ( data: LoginFormValues ) => {
    setLoading( true );
    try {
      const result = await signIn( "credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      } );

      if ( !result?.ok ) {
        message.error( "Login gagal. Periksa email dan password Anda." );
      } else {
        message.success( "Login berhasil!" );
        router.push( "/lamp-schedule" );
      }
    } catch ( error ) {
      message.error( "Terjadi kesalahan. Silakan coba lagi." );
    } finally {
      setLoading( false );
    }
  };

  return (
    <div className="w-full max-w-md shadow-lg">
      <Card>
        <Title level={2} className="text-center mb-6 animate-bounce">
          Login
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit( onSubmit )}
          initialValues={{ email: '', password: '' }} // Added initialValues here
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={( { field } ) => (
                <Input
                  {...field}
                  id={field.name} // Added explicit id to match Form.Item's expected htmlFor
                  prefix={<MailOutlined />}
                  placeholder="Masukkan email"
                  autoComplete="email" // Added autocomplete attribute
                />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Kata Sandi"
            name="password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={( { field } ) => (
                <Input.Password
                  {...field}
                  id={field.name} // Added explicit id to match Form.Item's expected htmlFor
                  prefix={<LockOutlined />}
                  placeholder="Masukkan Kata Sandi"
                  autoComplete="current-password" // Added autocomplete attribute
                />
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}