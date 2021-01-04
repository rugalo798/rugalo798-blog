import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Footer from '../components/Footer';

const Subtitle = styled.h2`
  background-color: var(--primary);
  color: white;
  display: inline-block;
  padding: 5px
`

export default function Home(props) {
  return (
    <div>
      <header className="headerContainer">
        <img src={props.avatar_url} />
        <Link href="/sobre">
          <a>
            <h1>Rugalo798's Blog</h1>
          </a>
        </Link>
      </header>
      <section className="postContainer">
        <Subtitle>Posts</Subtitle>

        <article className="postsContainer_post">
          <a href="/">
            Alura.js 01!
          </a>
          <p>
            Resumo do post
          </p>
        </article>
      </section>

      <section className="postContainer">
        <Subtitle>Repositórios Favoritos</Subtitle>
        {
          props.repos.map((project) => {
            return (
              <article 
                key={project.repo}
                className="postsContainer_post">
                <a href="/">
                  {project.repo}
                </a>
                <p>
                  {project.description}
                </p>
              </article>
            )
          })
        }
      </section>

      <Footer />
    </div>
  )
}


export async function getStaticProps() {

  const githubResponse = await fetch('https://api.github.com/users/rugalo798')
    .then(res => res.json())

  const reposResponse = await fetch('https://gh-pinned-repos.now.sh/?username=rugalo798')
    .then(res => res.json())

  return {
    props: {
      avatar_url: githubResponse.avatar_url,
      repos: reposResponse,
    }
  }
}