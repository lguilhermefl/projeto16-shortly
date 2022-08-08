--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer,
    token character varying NOT NULL,
    created_at date DEFAULT now()
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer,
    url text NOT NULL,
    short_url text NOT NULL,
    visits integer DEFAULT 0 NOT NULL,
    created_at date DEFAULT now()
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(140) NOT NULL,
    email character varying(40) NOT NULL,
    password character varying NOT NULL,
    created_at date DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token, created_at) FROM stdin;
1	11	16b2220c-9930-4d9c-b094-cfdda7b4ebbd	2022-08-08
2	1	459cc71c-1949-4120-936b-bcb3a1b92dd5	2022-08-08
3	3	7952f20e-c6fe-4e17-87a4-9ac5071a6df3	2022-08-08
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, user_id, url, short_url, visits, created_at) FROM stdin;
3	11	https://www.google.com	rJ0ffQHI	0	2022-08-08
4	11	https://www.google.com	Dn1_YbVV	0	2022-08-08
7	1	https://www.google.com	zv7brPWa	0	2022-08-08
9	3	https://www.google.com	oquPmIho	0	2022-08-08
11	3	https://www.google.com	2OxY4owG	0	2022-08-08
1	11	https://www.google.com	2fwsLMX_	3	2022-08-08
2	11	https://www.google.com	LJmOSeeP	2	2022-08-08
5	1	https://www.google.com	EtrOvWG7	6	2022-08-08
6	1	https://www.google.com	jqzi551l	1	2022-08-08
8	1	https://www.google.com	LR8sKQly	1	2022-08-08
10	3	https://www.google.com	sTnggxH8	1	2022-08-08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at) FROM stdin;
1	luiz	luiz@luiz.com	$2b$10$c1YDeAsjWIqw70zidYkUQ.tdAtwdl30TAWmUlqs7PmmoDiQ2OyM/W	2022-08-08
2	pedro	pedro@pedro.com	$2b$10$yUcsq4xncaG57/CF4c7O4OK.svK6Al2QhMDyifzRIijLgt8XGQjqO	2022-08-08
3	marcia	marcia@marcia.com	$2b$10$MpkCh7718mxPEOYrlw4n5.h5vQCPCRnADY4vMnl61xxmOGCpRMYmq	2022-08-08
4	renata	renata@renata.com	$2b$10$7IhXwWghbSnTf.sYHzt72e/B9O6dBSn52j/b1bC/ChMk0Tvc0i1hG	2022-08-08
5	carlos	carlos@carlos.com	$2b$10$7F7n8GxgiY1gtZU8TTcQ/eD2KP3f4GYK/tCNmWdgvQInoG/YP07J.	2022-08-08
6	amanda	amanda@amanda.com	$2b$10$DbgrkHyUTs.s1DPfj5sw5uuRzpO8FPz1VJzDqibMGq7lkvtysmrqi	2022-08-08
7	perola	perola@perola.com	$2b$10$dbJyff.yvSYf/OLT7ZpWdOebZj66g3ErcIfYKPU/JpG6TZUeN.Zr.	2022-08-08
8	patricia	patricia@patricia.com	$2b$10$dd484Y7u9NYsgPJrUAaq5OqnXDt5gBy7koI1uwCxeLKfdEookZamW	2022-08-08
9	renato	renato@renato.com	$2b$10$t9ShpLBk4.lWWz9YRvhEHegqMAZcPG566ASf3/3UWykJwflc9FLd.	2022-08-08
10	leandro	leandro@leandro.com	$2b$10$sN9UKXwSla/6qfZyHvVwGuxLxIBfTGJA2OlRtMYs38STOF1YVU8p6	2022-08-08
11	carla	carla@carla.com	$2b$10$9gWaGR1yM6hbGfz1GBjse.00E80xTqJxCecPc97yNtWKTsbnUxrou	2022-08-08
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

