job("Run npm test and publish") {
    
    host("Build artifacts and a Docker image") {
        
        env["HUB_USER"] = Params("dockerhub_user")
        env["HUB_TOKEN"] = Secrets("dockerhub_token")
        env["SPACE_REPO"] = "ikit-ki20-161-b.registry.jetbrains.space/p/team-course-project-2022-2023/frontend-client"

        
        failOn {
            testFailed {  enabled = false  }
            nonZeroExitCode { enabled = false }
        }

        startOn {
            gitPush {
                // run on changes in all 'release-...'
                // branches excluding 'release-main'
                // exclude rules have priority
                branchFilter {
                    +"main"
                }
                pathFilter {
                    +"src/**"
                }
            }
        }
         
        


       shellScript {
                // login to Docker Hub
                content = """
                    docker login ${'$'}SPACE_REPO -u ${'$'}HUB_USER --password "${'$'}HUB_TOKEN"
                """
        }

        dockerBuildPush {
                // Docker context, by default, project root
                context = "."
                file = "Dockerfile"
                labels["repo"] = "frontend"

                val spaceRepo = "ikit-ki20-161-b.registry.jetbrains.space/p/team-course-project-2022-2023/frontend-client"
                tags {
                    +"$spaceRepo:1.0.${"$"}JB_SPACE_EXECUTION_NUMBER"
                    +"$spaceRepo:latest"
                }
        }
    }
}

