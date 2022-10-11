# Dev to Prod Life-cycle

```Small summary and graph(s) on how the provided App deployment could be automated from dev to production```


### How could the versions be managed inside the docker ?

We can manage the version of the Docker Image, and as per the required versions we can tag the image using the tag value in the docker Image.
According to the best Practices , whenever we commit any changes in the code in the VCM ( say, Github) and will get the Hash value , that we will use as the tag in the docker Image for the new Version , so this is how we can manage versions in docker by adding the successful hash value as the tag in the Docker Image for the deployment.

```Version -  "${BUILD}-${SHA}```
```Example - application:2-aehs345h37hd7dw0jd913de ```

### What would be the name of each docker version, where would they be stored ?

The name of the docker version will be the - application-name:version

And , it will be stored in the Docker Registry (say ECR or Dockerhub).

### Where could the frontend assets be placed: inside the docker stack/version or somewhere else ?

It will be deployed in containers only. 
CDN and S3 could be used if the frontend is using html,css and js only or some single page application framework like Mern or Mean which comes in best practices to deliver 3-tier applications

### How many stages should the docker and app pass before going Live ?

According to the best practices , our application should pass at least these three stages before going to the live deployment -

Development

Testing

Staging  

### How could these dockers and stages be automated ?

This can be automated by CI/CD pipelines using the Jenkins or the Gitlab or we can use Blue green deployment for the deployment. Using a blue/green deployment strategy increases application availability and reduces deployment risk by simplifying the rollback process if a deployment fails.

