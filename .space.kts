job("Run npm test and publish") {
    container(displayName = "Run publish script", image = "node:14-alpine") {
        env["REGISTRY"] = "https://npm.pkg.jetbrains.space/ikit-ki20-161-b/p/team-course-project-2022-2023/client/"
        shellScript {
            interpreter = "/bin/sh"
            content = """
                echo Install npm dependencies...
                npm ci
                echo Run build if it exists in package.json...
                npm run build --if-present
                echo Run publishing...
                chmod +x ./publish.sh
                ./publish.sh
            """
        }
    }
    
    container("openjdk:11") {
    kotlinScript { api ->
        api.space().projects.automation.deployments.start(
            project = api.projectIdentifier(),
            targetIdentifier = TargetIdentifier.Key("ssh-root-62-113-96-162"),
            version = "1.0.0",
            // automatically update deployment status based on a status of a job
            syncWithAutomationJob = true
        )
    }
}
}

