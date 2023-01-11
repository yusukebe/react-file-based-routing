import Header from '../components/header'

export default function App({ children }: any) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
