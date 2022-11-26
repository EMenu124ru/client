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
}