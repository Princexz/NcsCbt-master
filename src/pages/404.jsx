import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Page404 = () => {
    const history = useNavigate()
  return (
        <section class="flex items-center h-screen p-16 dark:bg-primary">
    <div class="container flex flex-col items-center ">
        <div class="flex flex-col gap-6 max-w-md text-center">
            <h2 class="font-extrabold text-9xl text-gray-700 dark:text-gray-300 animate-pulse">
                <span class="sr-only">Error</span>404
            </h2>
            <p class="text-2xl md:text-3xl dark:text-gray-300 animate-bounce">Oops! We couldn't find this page.</p>
            <Link to='/' class="px-8 py-4 text-xl font-semibold rounded dark:bg-secondary bg-primary text-primary">Back to home</Link>
        </div>
    </div>
</section>
  )
}
