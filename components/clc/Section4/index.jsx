import styles from "./styles.module.scss";

export default function Section4() {
  const testimonials = [
    {
      text: "Estou absolutamente encantada com o atendimento personalizado que recebi. A qualidade dos acessórios para minha lareira é excepcional. Sem dúvida, recomendo a todos que procuram produtos duráveis e elegantes!",
      name: "Luis F.",
      location: "Canoas, RS",
      image: "/images/clc/user1.png",
    },
    {
      text: "Desde a compra até a instalação, tudo foi perfeito. Os profissionais são extremamente competentes e atenciosos. Minha nova chaminé transformou completamente o ambiente da minha sala. Muito obrigado!",
      name: "Ana P.",
      location: "Rio de Janeiro, RJ",
      image: "/images/clc/user2.png",
    },
    {
      text: "Impressionada com a rapidez da entrega e a qualidade do produto. Comprei um conjunto de ferramentas para lareira e superou todas as minhas expectativas. Já estou recomendando para todos os meus amigos!",
      name: "Joaquim T.",
      location: "Batel, Curitiba",
      image: "/images/clc/user3.png",
    },
    {
      text: "Excelente serviço e produtos de top! A chaminé que compramos é um destaque no nosso lar, e o suporte ao cliente foi simplesmente impecável.",
      name: "Helena G.",
      location: "São Paulo, SP",
      image: "/images/clc/user4.png",
    },
    {
      text: "Fiquei muito satisfeita com a compra do meu novo exaustor para chaminé. O produto é de alta qualidade e o preço foi o melhor que encontrei no mercado. A instalação foi rápida e sem complicações.",
      name: "Carlos S.",
      location: "São Paulo",
      image: "/images/clc/user5.png",
    },
    {
      text: "A qualidade dos produtos é realmente visível. Comprei uma nova tela para minha lareira e estou muito contente com o acabamento e a segurança que ela proporciona. Excelente escolha para quem busca qualidade e segurança.",
      name: "Mariana R.",
      location: "Porto Alegre, RS",
      image: "/images/clc/user6.png",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Compromisso com a Satisfação</h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <p>{testimonial.text}</p>
              <div className={styles.user}>
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
