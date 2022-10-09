import { useRouter } from 'next/router'
import Button from '@mui/material/Button';

export default function Page() {
  const router = useRouter()

  return (
    <Button variant="contained" color="primary">
    Hello World
  </Button>
  )
}