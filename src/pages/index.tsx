import Image from "next/image";
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import usersImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'
import { api } from "../libs/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  const submitPoolForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code);
      alert('Bolão criado com sucesso, o código foi copiado para a área de transfêrencia!');
    } catch (error) {
      console.log(error);
      alert('Houve um erro, tente novamente!');
    } finally {
      setPoolTitle('')
    }

  }

  return (
    <div className="max-w-[1124px] mx-auto h-screen grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa Logo" quality={100} />

        <h1 className="mt-16  font-bold text-white text-5xl leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center font-bold text-gray-100">
          <Image src={usersImg} alt="Usuários jogando" quality={100} />
          <strong className="mx-2">
            <span className="text-ignite-500">+{props.userCount} </span> pessoas já estão usando
          </strong>
        </div>

        <form className="mt-12 flex gap-2" onSubmit={submitPoolForm}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual nome do seu bolão?"
            required
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu Bolão
          </button>
        </form>

        <div className="mt-4 text-gray-300 leading-relaxed">
          <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
        </div>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between">
          <div className="flex">
            <Image src={iconCheckImg} alt="Ícone de checado" quality={100} />
            <div className="flex flex-col px-6 text-gray-100">
              <span className="font-bold">+{props.poolCount}</span>
              Bolões criados
            </div>
          </div>

          <div className="border border-gray-600" />

          <div className="flex">
            <Image src={iconCheckImg} alt="Ícone de checado" quality={100} />
            <div className="flex flex-col px-6 text-gray-100">
              <span className="font-bold">+{props.guessCount}</span>
              Palpites enviados
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois celulares" quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse,
  ] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    api.get("/users/count"),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}