import styled from "styled-components"

const Container = styled.section`
width: 50%;
`

const Titulo = styled.h2`
font-weight: 700;
font-size: 24px;
line-height: 28px;
text-align: center;
color: var(--azul-escuro);
`

const Texto = styled.p`
line-height: 19px;
color: var(--cinza);
`

const Subtitulo = styled.h3`
line-height: 19px;
font-weight: 700;
color: var(--cinza-escuro);
text-align: center;
`

const Linha = styled.hr`
color: var(--cinza)
`

export default function Depoimentos() {
    return (
        <Container>
            <Titulo>Depoimentos</Titulo>
            <Texto>Foi fácil de usar e me permitiu marcar minha consulta de forma rápida e conveniente. A variedade de opções de horários disponíveis foi útil e a confirmação da consulta foi eficiente. Recomendaria para quem busca praticidade na marcação de consultas.</Texto>
            <Subtitulo>Júlio, 40 anos, São Paulo/SP.</Subtitulo>
            <Linha />
            <Texto>Minha experiência com a Voll foi bastante satisfatória. A interface era intuitiva e fácil de usar, o que facilitou bastante o processo de marcar minha consulta.</Texto>
            <Subtitulo>Robson, 28 anos, Rio de Janeiro/RJ.</Subtitulo>
            <Linha />
            <Texto>Utilizei o aplicativo de agendamento de consulta e fiquei satisfeito com a praticidade oferecida. O processo de marcação foi simples e direto, encontrando facilmente horários disponíveis que se adequavam à minha agenda. A confirmação da consulta também foi rápida, o que me trouxe tranquilidade quanto à marcação.</Texto>
            <Subtitulo>Marinalva, 53 anos, São Paulo/SP.</Subtitulo>
            <Linha />
        </Container>
    )
}
