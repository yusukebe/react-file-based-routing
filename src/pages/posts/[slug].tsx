import { useParams } from 'react-router-dom'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  return (
    <>
      <h2>{slug}</h2>
    </>
  )
}
