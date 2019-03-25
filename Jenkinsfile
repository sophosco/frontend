pipeline {
    agent {
        node {
            // spin up a node.js slave pod to run this build on
            label 'nodejs'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                    npm install -g @angular/cli@7.3.6
                    npm install
                    npm run-script build --prod=true
                '''
            }
        }
    }

    stage('Source code analysis') {
        steps {
            script {
                def scannerHome = tool 'SonarScanner';
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
    }
    

}