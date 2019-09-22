<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa:400,500,700&display=swap&subset=cyrillic" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="header__block">
                            <div class="logo d-flex justify-content-center">
                                <img src="/img/logo_transparent.png" alt="Logotype">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="header__block">
                            <search-task></search-task>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="header__block">
                            Additional options
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="add__task d-flex justify-content-center">
                        <button class="add__task__button">
                            <img src="https://img.icons8.com/nolan/64/000000/joyent.png" style="width: 40px;height: 40px;">Добавить задачу
                        </button>
                    </div>
                    <aside>
                        <ul class="nav flex-column">
                            <li class="nav-item active">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'tasks-all'}"
                                >Все</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'tasks-today'}"
                                >Сегодня</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'tasks-yesterday'}"
                                >Вчера</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    class="nav-link"
                                    :to="{ name: 'tasks-last-7-days'}"
                                >Последние 7 дней</router-link>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div class="col-md-9">
                    <main>
                    @yield("content")
                    </main>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
